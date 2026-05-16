const API_BASE = "https://api.workoutxapp.com/v1";

const STOP_WORDS = /\b(ss\d+|tabata|circuit|block \d+|amrap|finisher|superset|giant set)\b/gi;
const EQUIPMENT_WORDS = /\b(barbell|dumbbell|dumbbells|db|dbs|band|banded|bands|bodyweight|weighted|bw|cable|machine|kettlebell)\b/gi;

const MANUAL_QUERY_MAP = [
  [/bench press/i, "bench press"],
  [/lateral raises?/i, "lateral raise"],
  [/walking lunges?|bulgarian split squat|plyometric lunges?|jump lunges?/i, "lunge"],
  [/bent-over row|barbell row|dumbbell row|db row/i, "row"],
  [/overhead press|arnold press/i, "shoulder press"],
  [/romanian deadlift|conventional deadlift|deadlift/i, "deadlift"],
  [/back squat|goblet squat|sumo squat|jump squat/i, "squat"],
  [/hip thrust|glute bridge/i, "hip thrust"],
  [/bicep curls?|barbell curl|hammer curls?/i, "bicep curl"],
  [/skull crushers?|tricep|close-grip/i, "triceps extension"],
  [/burpees?/i, "burpee"],
  [/mountain climbers?/i, "mountain climber"],
  [/high knees?/i, "high knees"],
  [/push-?ups?|push up/i, "push up"],
  [/calf raises?/i, "calf raise"],
  [/yoga|mobility|stretch/i, "stretching"],
];

function cleanName(name) {
  const manual = MANUAL_QUERY_MAP.find(([pattern]) => pattern.test(name));
  if (manual) return manual[1];

  return name
    .replace(/^[^:]+:\s*/, "")
    .replace(/\([^)]*\)/g, "")
    .replace(STOP_WORDS, "")
    .replace(EQUIPMENT_WORDS, "")
    .replace(/\+/g, " ")
    .replace(/\braises\b/gi, "raise")
    .replace(/\blunges\b/gi, "lunge")
    .replace(/\d+\s*(s|min|rounds?|on|off|between|each|reps?)\b/gi, " ")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getGifUrl(exercise) {
  return exercise?.gifUrl
    || exercise?.gif_url
    || exercise?.gif
    || exercise?.image
    || exercise?.imageUrl
    || exercise?.thumbnail
    || exercise?.mediaUrl
    || null;
}

function unwrapWorkoutXResponse(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.exercises)) return data.exercises;
  if (Array.isArray(data?.results)) return data.results;
  if (data && typeof data === "object") return [data];
  return [];
}

function scoreMatch(query, exercise) {
  const q = cleanName(query).toLowerCase();
  const n = String(exercise?.name || "").toLowerCase();
  if (!q || !n) return 0;
  if (n === q) return 100;
  if (n.includes(q) || q.includes(n)) return 80;
  const qTokens = new Set(q.split(/\s+/).filter(Boolean));
  const nTokens = new Set(n.split(/\s+/).filter(Boolean));
  let overlap = 0;
  qTokens.forEach(token => {
    if (nTokens.has(token)) overlap += 1;
  });
  return Math.round((overlap / Math.max(1, qTokens.size)) * 70);
}

async function searchWorkoutX(name, key) {
  const candidates = [...new Set([cleanName(name), name])].filter(Boolean);

  for (const candidate of candidates) {
    const url = `${API_BASE}/exercises/name/${encodeURIComponent(candidate)}`;
    console.log("[WorkoutX] search", { original: name, candidate, url });
    const res = await fetch(`${API_BASE}/exercises/name/${encodeURIComponent(candidate)}`, {
      headers: { "X-WorkoutX-Key": key },
    });

    console.log("[WorkoutX] status", { candidate, status: res.status, ok: res.ok });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.warn("[WorkoutX] non-ok response", { candidate, status: res.status, body: body.slice(0, 300) });
      continue;
    }

    const data = await res.json();
    const list = unwrapWorkoutXResponse(data);
    console.log("[WorkoutX] response shape", {
      candidate,
      isArray: Array.isArray(data),
      topLevelKeys: data && typeof data === "object" ? Object.keys(data).slice(0, 12) : [],
      count: list.length,
      firstKeys: list[0] ? Object.keys(list[0]).slice(0, 16) : [],
      firstMedia: getGifUrl(list[0]),
    });

    const ranked = list
      .filter(item => getGifUrl(item))
      .map(item => ({ item, score: scoreMatch(candidate, item) }))
      .sort((a, b) => b.score - a.score);

    if (ranked[0]?.score >= 30) return ranked[0].item;
  }

  return null;
}

export default async function handler(req, res) {
  const key = process.env.VITE_WORKOUTX_API_KEY;
  console.log("[WorkoutX] key configured", { configured: Boolean(key), length: key?.length || 0 });

  if (!key) {
    return res.status(200).json({ exercises: {}, missing: [], keyConfigured: false, error: "WorkoutX API key is not configured." });
  }

  const rawNames = String(req.query.names || "");
  const names = rawNames.split("|").map(name => name.trim()).filter(Boolean).slice(0, 12);
  console.log("[WorkoutX] request names", names);

  if (!names.length) {
    return res.status(200).json({ exercises: {}, missing: [], keyConfigured: true });
  }

  const entries = await Promise.all(names.map(async name => {
    try {
      const match = await searchWorkoutX(name, key);
      if (!match) return [name, null];
      const gifUrl = getGifUrl(match);
      return [name, {
        id: match.id,
        name: match.name,
        bodyPart: match.bodyPart,
        target: match.target,
        equipment: match.equipment,
        gifUrl,
        mediaField: Object.entries({
          gifUrl: match.gifUrl,
          gif_url: match.gif_url,
          gif: match.gif,
          image: match.image,
          imageUrl: match.imageUrl,
          thumbnail: match.thumbnail,
          mediaUrl: match.mediaUrl,
        }).find(([, value]) => value === gifUrl)?.[0],
      }];
    } catch (error) {
      console.error("[WorkoutX] match failed", { name, message: error?.message });
      return [name, null];
    }
  }));

  const exercises = Object.fromEntries(entries.filter(([, value]) => value?.gifUrl));
  const missing = entries.filter(([, value]) => !value?.gifUrl).map(([name]) => name);
  console.log("[WorkoutX] proxy result", { matched: Object.keys(exercises), missing });

  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate=604800");
  return res.status(200).json({ exercises, missing, keyConfigured: true });
}

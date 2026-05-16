const API_BASE = "https://api.workoutxapp.com/v1";

const STOP_WORDS = /\b(ss\d+|tabata|circuit|block \d+|amrap|finisher|superset|giant set)\b/gi;

function cleanName(name) {
  return name
    .replace(/^[^:]+:\s*/, "")
    .replace(/\([^)]*\)/g, "")
    .replace(STOP_WORDS, "")
    .replace(/\bDB\b/gi, "dumbbell")
    .replace(/\bBW\b/gi, "bodyweight")
    .replace(/\+/g, " ")
    .replace(/\d+\s*(s|min|rounds?|on|off|between|each|reps?)\b/gi, " ")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
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
  const candidates = [...new Set([name, cleanName(name)])].filter(Boolean);

  for (const candidate of candidates) {
    const res = await fetch(`${API_BASE}/exercises/name/${encodeURIComponent(candidate)}`, {
      headers: { "X-WorkoutX-Key": key },
    });

    if (!res.ok) continue;
    const data = await res.json();
    const list = Array.isArray(data) ? data : data ? [data] : [];
    const ranked = list
      .filter(item => item?.gifUrl)
      .map(item => ({ item, score: scoreMatch(candidate, item) }))
      .sort((a, b) => b.score - a.score);

    if (ranked[0]?.score >= 30) return ranked[0].item;
  }

  return null;
}

export default async function handler(req, res) {
  const key = process.env.VITE_WORKOUTX_API_KEY;

  if (!key) {
    return res.status(200).json({ exercises: {}, error: "WorkoutX API key is not configured." });
  }

  const rawNames = String(req.query.names || "");
  const names = rawNames.split("|").map(name => name.trim()).filter(Boolean).slice(0, 12);

  if (!names.length) {
    return res.status(200).json({ exercises: {} });
  }

  const entries = await Promise.all(names.map(async name => {
    try {
      const match = await searchWorkoutX(name, key);
      if (!match) return [name, null];
      return [name, {
        id: match.id,
        name: match.name,
        bodyPart: match.bodyPart,
        target: match.target,
        equipment: match.equipment,
        gifUrl: match.gifUrl,
      }];
    } catch {
      return [name, null];
    }
  }));

  const exercises = Object.fromEntries(entries.filter(([, value]) => value?.gifUrl));

  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate=604800");
  return res.status(200).json({ exercises });
}

const API_BASE = "https://api.workoutxapp.com/v1";

const STOP_WORDS = /\b(ss\d+|tabata|circuit|block \d+|amrap|finisher|superset|giant set)\b/gi;
const EQUIPMENT_WORDS = /\b(barbell|dumbbell|dumbbells|db|dbs|band|banded|bands|bodyweight|weighted|bw|cable|machine|kettlebell)\b/gi;
const MEDIA_FIELDS = ["gifUrl", "gif_url", "gif", "image", "imageUrl", "thumbnail", "mediaUrl", "video", "videoUrl", "url"];

const MANUAL_QUERY_MAP = [
  [/bench press/i, "bench press"],
  [/lateral raises?/i, "lateral raise"],
  [/walking lunges?|bulgarian split squat|plyometric lunges?|jump lunges?/i, "lunge"],
  [/bent-?over row/i, "bent over row"],
  [/barbell row|dumbbell row|db row/i, "row"],
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

function unwrapWorkoutXResponse(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.exercises)) return data.exercises;
  if (Array.isArray(data?.results)) return data.results;
  if (data && typeof data === "object") return [data];
  return [];
}

function firstMediaField(value, path = "") {
  if (!value) return null;
  if (typeof value === "string" && /^https?:\/\//i.test(value)) {
    return { field: path || "value", url: value };
  }
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i += 1) {
      const found = firstMediaField(value[i], `${path}[${i}]`);
      if (found) return found;
    }
    return null;
  }
  if (typeof value !== "object") return null;

  for (const field of MEDIA_FIELDS) {
    const found = firstMediaField(value[field], path ? `${path}.${field}` : field);
    if (found) return found;
  }

  for (const [key, child] of Object.entries(value)) {
    if (!/(gif|image|img|thumb|media|video|url)/i.test(key)) continue;
    const found = firstMediaField(child, path ? `${path}.${key}` : key);
    if (found) return found;
  }

  return null;
}

function defaultWorkoutXMedia(rawJson) {
  const first = Array.isArray(rawJson?.data) ? rawJson.data[0] : null;
  if (first?.gifUrl) return { field: "data[0].gifUrl", url: first.gifUrl, item: first };
  const media = firstMediaField(first || rawJson);
  return media ? { ...media, item: first || null } : null;
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

async function fetchCandidate(originalName, candidate, key) {
  const url = `${API_BASE}/exercises/name/${encodeURIComponent(candidate)}`;
  const debug = {
    searchedExerciseName: candidate,
    originalExerciseName: originalName,
    requestUrl: url,
    apiStatusCode: null,
    rawWorkoutXResponse: null,
    detectedGifUrl: null,
    detectedMediaField: null,
    error: null,
  };

  try {
    console.log("[WorkoutX] search", { original: originalName, candidate, url });
    const response = await fetch(url, { headers: { "X-WorkoutX-Key": key } });
    debug.apiStatusCode = response.status;
    const rawText = await response.text();

    try {
      debug.rawWorkoutXResponse = rawText ? JSON.parse(rawText) : null;
    } catch {
      debug.rawWorkoutXResponse = rawText;
    }

    console.log("[WorkoutX] raw response", {
      candidate,
      status: response.status,
      ok: response.ok,
      raw: debug.rawWorkoutXResponse,
    });

    if (!response.ok) {
      debug.error = `WorkoutX returned HTTP ${response.status}: ${rawText || response.statusText}`;
      return { item: null, debug };
    }

    const defaultMedia = defaultWorkoutXMedia(debug.rawWorkoutXResponse);
    const list = unwrapWorkoutXResponse(debug.rawWorkoutXResponse);
    const ranked = list
      .map(item => {
        const media = firstMediaField(item);
        return { item, media, score: scoreMatch(candidate, item) };
      })
      .filter(entry => entry.media?.url)
      .sort((a, b) => b.score - a.score);

    const best = ranked[0] || (defaultMedia ? { item: defaultMedia.item || list[0], media: defaultMedia, score: 100 } : null);
    if (!best) {
      const fallbackMedia = defaultMedia || firstMediaField(debug.rawWorkoutXResponse);
      debug.detectedGifUrl = fallbackMedia?.url || null;
      debug.detectedMediaField = fallbackMedia?.field || null;
      debug.error = "WorkoutX response did not include a detectable image/video/media URL.";
      return { item: null, debug };
    }

    debug.detectedGifUrl = best.media.url;
    debug.detectedMediaField = best.media.field;
    return {
      item: {
        ...best.item,
        gifUrl: best.media.url,
        mediaField: best.media.field,
        matchScore: best.score,
      },
      debug,
    };
  } catch (error) {
    debug.error = error?.message || String(error);
    console.error("[WorkoutX] request failed", debug);
    return { item: null, debug };
  }
}

async function fetchRawEndpoint(endpointUsed, key) {
  const debug = {
    endpointUsed,
    apiStatusCode: null,
    rawJson: null,
    rawText: null,
    detectedMediaUrl: null,
    detectedMediaField: null,
    error: null,
  };

  try {
    const response = await fetch(endpointUsed, { headers: { "X-WorkoutX-Key": key } });
    debug.apiStatusCode = response.status;
    debug.rawText = await response.text();

    try {
      debug.rawJson = debug.rawText ? JSON.parse(debug.rawText) : null;
      const media = defaultWorkoutXMedia(debug.rawJson) || firstMediaField(debug.rawJson);
      debug.detectedMediaUrl = media?.url || null;
      debug.detectedMediaField = media?.field || null;
    } catch (error) {
      debug.error = `Response was not valid JSON: ${error?.message || String(error)}`;
    }
  } catch (error) {
    debug.error = error?.message || String(error);
  }

  return debug;
}

async function searchWorkoutX(name, key) {
  const candidates = [...new Set([cleanName(name), name])].filter(Boolean);
  let lastDebug = null;

  for (const candidate of candidates) {
    const result = await fetchCandidate(name, candidate, key);
    lastDebug = result.debug;
    if (result.item) return result;
  }

  return { item: null, debug: lastDebug || { searchedExerciseName: name, originalExerciseName: name, error: "No search candidates were generated." } };
}

export default async function handler(req, res) {
  const key = process.env.VITE_WORKOUTX_API_KEY;
  console.log("[WorkoutX] key configured", { configured: Boolean(key), length: key?.length || 0 });

  if (!key) {
    return res.status(200).json({
      exercises: {},
      debug: {},
      missing: [],
      keyConfigured: false,
      error: "WorkoutX API key is not configured.",
    });
  }

  const singleName = String(req.query.name || "").trim();
  if (singleName) {
    const endpoints = [
      `${API_BASE}/exercises/name/${encodeURIComponent(cleanName(singleName))}`,
    ];
    const tests = await Promise.all(endpoints.map(endpoint => fetchRawEndpoint(endpoint, key)));

    console.log("[WorkoutX] manual endpoint test", {
      name: singleName,
      tests: tests.map(test => ({
        endpointUsed: test.endpointUsed,
        apiStatusCode: test.apiStatusCode,
        error: test.error,
        rawJson: test.rawJson,
      })),
    });

    return res.status(200).json({
      keyConfigured: true,
      name: singleName,
      tests,
    });
  }

  const rawNames = String(req.query.names || "");
  const names = rawNames.split("|")
    .map(name => name.trim())
    .filter(Boolean)
    .slice(0, 12);

  console.log("[WorkoutX] request names", names);

  if (!names.length) {
    return res.status(200).json({ exercises: {}, debug: {}, missing: [], keyConfigured: true });
  }

  const entries = await Promise.all(names.map(async name => {
    const { item, debug } = await searchWorkoutX(name, key);
    if (!item) return [name, null, debug];
    return [name, {
      id: item.id,
      name: item.name,
      bodyPart: item.bodyPart,
      target: item.target,
      equipment: item.equipment,
      gifUrl: item.gifUrl,
      mediaField: item.mediaField,
      matchScore: item.matchScore,
    }, debug];
  }));

  const exercises = Object.fromEntries(entries.filter(([, value]) => value?.gifUrl).map(([name, value]) => [name, value]));
  const debug = Object.fromEntries(entries.map(([name,, value]) => [name, value]));
  const missing = entries.filter(([, value]) => !value?.gifUrl).map(([name]) => name);

  console.log("[WorkoutX] proxy result", { matched: Object.keys(exercises), missing, debug });

  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");

  return res.status(200).json({ exercises, debug, missing, keyConfigured: true });
}

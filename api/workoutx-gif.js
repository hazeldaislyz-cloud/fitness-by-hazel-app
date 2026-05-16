export default async function handler(req, res) {
  const key = process.env.VITE_WORKOUTX_API_KEY;
  const id = String(req.query.id || "").trim();

  if (!key) {
    return res.status(500).json({ error: "WorkoutX API key is not configured." });
  }

  if (!/^[A-Za-z0-9_-]+$/.test(id)) {
    return res.status(400).json({ error: "A valid WorkoutX exercise id is required." });
  }

  const response = await fetch(`https://api.workoutxapp.com/v1/gifs/${encodeURIComponent(id)}.gif`, {
    headers: { "X-WorkoutX-Key": key },
  });

  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText);
    return res.status(response.status).json({ error: message || `WorkoutX GIF request failed with ${response.status}.` });
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  res.setHeader("Content-Type", response.headers.get("content-type") || "image/gif");
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate=604800");
  return res.status(200).send(buffer);
}

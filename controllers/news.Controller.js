require("dotenv").config();
const { findCache, upsertCache } = require("../models/News.models");

const REFRESH_MS = 12 * 60 * 60 * 1000; // twice a day

async function getNews(req, res) 
{
  const apiKey   = process.env.NEWS_API_KEY;
  const query    = "gaming";
  const language = "en";
  const sortBy   = "publishedAt";
  const pageSize = 5;

  const cacheKey = `news:${query}:${language}:${sortBy}:${pageSize}`;
  let cachedRow = null;

  try 
  {
    // 1) Try to fetch from DB
    const cachedRes = await findCache(cacheKey); // returns pg result
    cachedRow = cachedRes.rows[0];
    const fresh = cachedRow && (Date.now() - new Date(cachedRow.refreshed_at).getTime() < REFRESH_MS);
    if (fresh) return res.json(cachedRow.payload);

    // 2) Refresh from API
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=${language}&sortBy=${sortBy}&pageSize=${pageSize}&apiKey=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`NewsAPI ${response.status}`);
    const data = await response.json();
    const items = Array.isArray(data.articles) ? data.articles : [];

    // 3) Update cache
    await upsertCache(cacheKey, items);

    return res.json(items);
  } 
  catch (error) 
  {
    console.error("News API Error:", error.message);
    // 4) Fallback to stale if exists
    if (cachedRow) return res.json(cachedRow.payload);
    return res.status(502).json({ error: "Failed to fetch news" });
  }
}

module.exports = {
    getNews
};

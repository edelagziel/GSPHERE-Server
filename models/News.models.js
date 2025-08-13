const pool = require("../db");

const TABLE = "news_cache";

async function findCache(cacheKey) 
{
    const query = `SELECT payload, refreshed_at FROM ${TABLE} WHERE cache_key = $1`;
    const values = [cacheKey];
    return pool.query(query, values);
}

async function upsertCache(cacheKey, payload) 
{
    const query = `
        INSERT INTO ${TABLE} (cache_key, payload, refreshed_at)
        VALUES ($1, $2, NOW())
        ON CONFLICT (cache_key)
        DO UPDATE SET payload = EXCLUDED.payload, refreshed_at = EXCLUDED.refreshed_at
    `;
    const values = [cacheKey, JSON.stringify(payload)];
    return pool.query(query, values);
}

module.exports = 
{
    findCache,
    upsertCache
};

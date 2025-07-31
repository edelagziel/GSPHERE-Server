require("dotenv").config();


async function getNews(req, res) {
    const apiKey = process.env.NEWS_API_KEY;
  
    // 🟨 פרמטרים נפרדים לסינון
    const query = "gaming";           // מה מחפשים
    const language = "en";            // שפה
    const sortBy = "publishedAt";     // מיון
    const pageSize = 5;               // כמות תוצאות
  
    // 🟦 בניית ה־URL
    const url = `https://newsapi.org/v2/everything?q=${query}&language=${language}&sortBy=${sortBy}&pageSize=${pageSize}&apiKey=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      res.json(data.articles);
    } catch (error) {
      console.error("News API Error:", error);
      res.status(500).json({ error: "Failed to fetch news" });
    }
  }
module.exports = {
    getNews
};

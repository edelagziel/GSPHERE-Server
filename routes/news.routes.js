const express = require("express");
const router = express.Router();
const newsController = require("../controllers/news.Controller");



router.get("/",newsController.getNews);



module.exports = router;

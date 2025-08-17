const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadFileController } = require("../controllers/uploadController");

// נשתמש בזיכרון כדי לא לשמור את הקובץ מקומית
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("file"), uploadFileController);

module.exports = router;

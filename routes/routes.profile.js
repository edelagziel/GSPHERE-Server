const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile.Controller");



router.get("/", profileController.getProfile);

router.post("/", profileController.createProfile);

router.put("/", profileController.updateProfile);

module.exports = router;

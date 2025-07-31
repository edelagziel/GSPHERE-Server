
const userhot = require("../controllers/authController");
const profileController = require("../controllers/profile.Controller");


const express = require("express");
const authrouter = express.Router();

authrouter.post("/register", userhot.register,profileController.createProfile);
authrouter.post("/logIn", userhot.login);
authrouter.post("/logOut", userhot.logout);






module.exports = authrouter;


const userhot = require("../controllers/authController");


const express = require("express");
const authrouter = express.Router();

authrouter.post("/register", userhot.register);
authrouter.post("/logIn", userhot.login);
authrouter.post("/logOut", userhot.logout);






module.exports = authrouter;

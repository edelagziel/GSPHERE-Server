const userhot = require("../controllers/authController");


const express = require("express");
const authrouter = express.Router();

authrouter.post("/register", userhot.register);

// authrouter.post("/logIn", userhot.register);
// authrouter.post("/logOut", userhot.register);




module.exports = authrouter;

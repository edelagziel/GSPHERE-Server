//we will imlemnt api for autintication 
//all app get post delate 


const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createToken = (user) => {
    return jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  };
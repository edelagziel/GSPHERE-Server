//we will imlemnt api for autintication 
//all app get post delate 
const userModel = require("../models/authModel");
const { createToken } = require("../utils/jwt");



async function register(req, res) {
    console.log(`register reqwest body: ${req.body}`);
    res.send("register");
}


module.exports ={register};
const jwt = require("jsonwebtoken");




const createToken = (user) => 
    {
      const token = jwt.sign(
        { email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      return token;
    };


    module.exports = { createToken };
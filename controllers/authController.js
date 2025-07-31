//we will imlemnt api for autintication 
//all app get post delate 

const {newTokenNeed}=require("../middleware/authService");
const authService=require("../middleware/authService")
const userModel = require("../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds=10;



async function register(req, res,next)
 {
    try 
    {
        const { first_name,last_name,email, password,role } = req.body;
        if(!email || !password||!role)
            {
                return res.status(400).json({ error: "not valid parameter",message: "parameter was sent in different key format"  });
            }
        const roleId = parseInt(role); 
       const hashedPassword = await bcrypt.hash(password, saltRounds);
        if(await userModel.getUser(email))return res.status(400).json({ error: "User already exists" }); 
         const user = await userModel.createUser(first_name,last_name,email,hashedPassword,roleId);
         req.user = user;
         next();
        // res.status(201).json(`register "+${JSON.stringify(user)}`);
    } 
    
    catch (error)
     {
        res.status(500).json({ error: error.message });
     }
    
}

async function login(req, res) 
{
    userLogIn= newTokenNeed(req);
    if(!userLogIn.needsToken)return res.status(400).json({error:"user alredey logIn"});
    console.log(`login reqwest body: ${JSON.stringify(req.body)}`);
    try
    {
        const { email, password } = req.body;
        if(!email||!password)return res.status(400).json({ error: "not valid parmeter",message:"parmeter was send in difrent key format" });
        const loginUser= await userModel.getUser(email)
         if (!loginUser) return res.status(404).json({ error: "User not exists" });
         const isPasswordValid= await bcrypt.compare(password,loginUser.password_hash);
         if(!isPasswordValid) return res.status(401).json({error:"Invalid password ",message:"user name or password incorrect"})
            const payLoad= 
            {
                user_id:loginUser.user_id,
                email:loginUser.email,
                role:loginUser.role
            };

           const token= jwt.sign(payLoad,process.env.JWT_SECRET,{ expiresIn:"3h" });
           res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 3*60*60*1000
          }).json({ message: "Login successful" });
     

    }
    catch(err)
    {
        return res.status(500).json({error:"Server Error ",message:"Error when atempt to log in "});
    }
  

}
async function logout(req, res) 
{
    res.clearCookie("token", {
      httpOnly: false,
      secure: false,
      sameSite: "lax"
    });
    res.json({ message: "Logged out" });
  }
  


module.exports ={register,login,logout};
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next)
{
    const token = req.cookies.token;
    if(!token) 
        return res.status(401).json({errr: "Access denied. No token provided."})
    try
    {
        validToken(token,req);
        next();
    }
    catch(error)
    {
        return res.status(401).json({error:"invalid token"});
    }
}


function validToken(token,req)
{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;   
}

function newTokenNeed(req)
 {
    const token = req.cookies.token;
    if(!token) 
    {
        return { needsToken: true, reason: "No token provided" };
    }
    
    try 
    {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return { needsToken: false, user: decoded };
    } 
    catch(error)
    {
        return { needsToken: true, reason: "Invalid/expired token" };
    }
}




module.exports= {verifyToken,newTokenNeed};
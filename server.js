// INCLUDES
//seting loading routes and active the server
const express = require("express");
require("dotenv").config(); 
const cors = require("cors");
// const path = require("path");//לא צריך משמש רק לצורך גישה לhtml אנו עושים את זה בנפרד 
const cookieParser = require("cookie-parser");//help me parse the cookies in the browser from http request headers
const { verifyToken } = require("./middleware/authService");
const app = express();
const serverPort = process.env.PORT || 3000;

const corsOptions = {
  origin: "https://gsphere-client.onrender.com",
  credentials: true
};


// app.use(cors({
//     origin: "https://gsphere-client.onrender.com", 
//     credentials: true
//   }));
 
app.use(cors(corsOptions));

  


// MIDDLEWARES
app.use(express.urlencoded({ extended: true }));//help me parse the body of the request is coming as form and parse to obj 
app.use(express.json());//help me parse the body of the request is coming as json and parse to obj 
app.use(cookieParser());
//Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", verifyToken,require("./routes/prodects/projects"));
app.use("/api/jobs",verifyToken,require("./routes/jobs"));
app.use("/api/news", verifyToken,require("./routes/news.routes"));
app.use("/api/profile", verifyToken,require("./routes/routes.profile"));




app.listen(serverPort,()=>{
    console.log(`Server is running on port ${serverPort}`);
}); 




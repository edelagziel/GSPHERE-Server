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

app.use(cors());//response *
// MIDDLEWARES
app.use(express.urlencoded({ extended: true }));//help me parse the body of the request is coming as form and parse to obj 
app.use(express.json());//help me parse the body of the request is coming as json and parse to obj 
// app.use(express.static(path.join(__dirname, "../frontend")));
app.use(cookieParser());
//Routes
app.use("/api/auth", require("./routes/auth"));
app.use(verifyToken);
app.use("/api/projects", require("./routes/prodects/projects"));
app.use("/api/jobs",require("./routes/jobs"));


// app.use("/api/posts", require("./routes/posts"));
// app.use("/api/comments", require("./routes/comments"));

// app.use("/api/likes", require("./routes/likes"));
// app.use("/api/follows", require("./routes/follows"));

app.listen(serverPort,()=>{
    console.log(`Server is running on port ${serverPort}`);
}); 




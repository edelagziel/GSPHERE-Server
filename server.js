// INCLUDES
//seting loading routes and active the server
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");//let me api for the cookies in the browser

const app = express();

// MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend")));
app.use(cookieParser());
//Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/comments", require("./routes/comments"));
app.use("/api/likes", require("./routes/likes"));
app.use("/api/follows", require("./routes/follows"));

app.listen(3000); // פותח פורט האזנה.

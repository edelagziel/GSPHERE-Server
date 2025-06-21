//user model כל התקשורת עם הדאטה בייס עם המשתמשים

const DB = require("../db");

DB.query()

const creatUser = async (Email, Password, role) => 
{
    const [result] = await DB.query("INSERT INTO users (Email, Password, role) VALUES (?, ?, ?)", [Email, Password, role]);
};



const getUser = async (Email) => 
{
    const [result] = await DB.query("SELECT * FROM users WHERE Email = ?", [Email]);
};

module.exports = { creatUser, getUser};

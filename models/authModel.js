//user model כל התקשורת עם הדאטה בייס עם המשתמשים

const DB = require("../db");

const creatUser = async (Email, Password, role) => 
{
    const [result] = await DB.query("INSERT INTO users (Email, Password, role) VALUES (?, ?, ?)", [Email, Password, role]);
    return result;
};

const getUser = async (Email) => 
{
    const [result] = await DB.query("SELECT email, user_role FROM users WHERE email = ?", [Email]);
    return result;
};

module.exports = { creatUser, getUser};

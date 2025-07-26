//user model כל התקשורת עם הדאטה בייס עם המשתמשים

const pool = require("../db");



const  createUser = (first_name, last_name, email, passwordHash, roleId) => {
    const query = "INSERT INTO users (first_name, last_name, email, password_hash, role) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [first_name, last_name, email, passwordHash, roleId];



    return pool.query(query, values)
    .then(result => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch(err => {
      console.error("Error inserting user:", err.stack);
      throw err;
    });
}
   
  









const getUser = async (Email) => 
{
    const query = "SELECT * FROM users WHERE email = $1" ;
    const values=[Email];
   try
   {
     const result=await pool.query(query, values);
      console.log(result.rows[0]);
      return result.rows[0];
   } 
   catch(err)
   {
    console.error("Error inserting user:", err.stack);
    throw err;
  }
}
  


module.exports = { createUser, getUser};

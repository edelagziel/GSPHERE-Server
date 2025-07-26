const PostgreSQL  = require("pg");


const pool = new PostgreSQL.Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10, 
  idleTimeoutMillis: 30000, // כמה זמן חיבור לא פעיל נשאר לפני סגירה
  ssl: { rejectUnauthorized: false },
});



pool.connect()
  .then(() => {
    console.log("connected to the database");
  })
  .catch(err => {
    console.error("Error connecting to the database", err);
  });







module.exports = pool;
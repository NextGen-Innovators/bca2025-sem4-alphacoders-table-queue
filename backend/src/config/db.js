const mysql = require("mysql2/promise");

// Create a pool (recommended for performance)
const db = mysql.createPool({
  host: "localhost",
  user: "root",         // your MySQL username
  password: "", // your MySQL password
  database: "foodiehub",// database name you will create
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = db;

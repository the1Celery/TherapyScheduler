require("dotenv").config();
const mysql = require("mysql2");

// Create the connection pool so we can reuse connections
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Export the pool with promise() for async/await queries
module.exports = pool.promise();
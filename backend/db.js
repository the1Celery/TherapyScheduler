// backend/db.js

const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

// Path to the SQLite file
const dbPath = path.resolve(__dirname, 'therapy_scheduler.sqlite');

// Only export the connection function.
// **No top‑level await or schema work here!**
const getDbConnection = async () =>
  open({ filename: dbPath, driver: sqlite3.Database });

module.exports = { getDbConnection };
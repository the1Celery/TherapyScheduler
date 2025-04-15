const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

// Create database path
const dbPath = path.resolve(__dirname, 'therapy_scheduler.sqlite');

// Create and export database connection
const getDbConnection = async () => {
  return open({
    filename: dbPath,
    driver: sqlite3.Database
  });
};

// Initialize database with tables
const initializeDatabase = async () => {
  const db = await getDbConnection();
  
  // Create student_account table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS student_account (
      student_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL
    )
  `);
  
  // Insert sample data if no students exist
  const count = await db.get('SELECT COUNT(*) as count FROM student_account');
  if (count.count === 0) {
    await db.exec(`
      INSERT INTO student_account (name, email) VALUES 
      ('John Smith', 'john.smith@example.com'),
      ('Sarah Johnson', 'sarah.j@example.com'),
      ('Michael Chen', 'mchen@example.com'),
      ('Emily Davis', 'emily.d@example.com')
    `);
  }
  
  await db.close();
  console.log('Database initialized successfully');
};

// Initialize database when this module is imported
initializeDatabase().catch(err => console.error('Database initialization failed:', err));

module.exports = { getDbConnection };


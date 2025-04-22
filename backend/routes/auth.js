// routes/auth.js
const express = require('express');
const router  = express.Router();
const { getDbConnection } = require('../db');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { role, email, password } = req.body;
  try {
    // open a SQLite connection
    const db = await getDbConnection();

    // pick the right table/ID column
    let sql;
    if (role === 'parent') {
      sql = 'SELECT parent_id AS id, password FROM parent_account WHERE email = ?';
    } else if (role === 'therapist') {
      sql = 'SELECT therapist_id AS id, password FROM therapist_account WHERE email = ?';
    } else {
      sql = 'SELECT student_id AS id, password FROM student_account WHERE email = ?';
    }

    // fetch exactly one row
    const row = await db.get(sql, [email]);
    await db.close();

    // check credentials
    if (!row || row.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // success – later you might issue a JWT or session
    return res.json({ message: 'Login successful', id: row.id, role });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
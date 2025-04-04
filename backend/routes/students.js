const express = require("express");
const router = express.Router();
const db = require("../db");

// Create a student
router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;
    const sql = "INSERT INTO student_account (name, email) VALUES (?, ?)";
    const [result] = await db.query(sql, [name, email]);
    res.json({ student_id: result.insertId, name, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Grab ALL students
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM student_account");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Grab a single student
router.get("/:id", async (req, res) => {
  try {
    const sql = "SELECT * FROM student_account WHERE student_id = ?";
    const [rows] = await db.query(sql, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Student not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a student
router.put("/:id", async (req, res) => {
  try {
    const { name, email } = req.body;
    const sql = `
      UPDATE student_account
      SET name = ?, email = ?
      WHERE student_id = ?
    `;
    await db.query(sql, [name, email, req.params.id]);
    res.json({ message: "Student updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE student
router.delete("/:id", async (req, res) => {
  try {
    const sql = "DELETE FROM student_account WHERE student_id = ?";
    await db.query(sql, [req.params.id]);
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
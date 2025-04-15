// routes/students.js
const express = require("express");
const router = express.Router();
const { getDbConnection } = require("../db");

// Create a student
router.post("/", async (req, res) => {
  try {
    const db = await getDbConnection();
    const { name, email } = req.body;
    const result = await db.run(
      "INSERT INTO student_account (name, email) VALUES (?, ?)",
      [name, email]
    );
    await db.close();

    res.json({
      student_id: result.lastID,
      name,
      email
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Grab ALL students
router.get("/", async (req, res) => {
  try {
    const db = await getDbConnection();
    const rows = await db.all("SELECT * FROM student_account");
    await db.close();

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Grab a single student
router.get("/:id", async (req, res) => {
  try {
    const db = await getDbConnection();
    const student = await db.get(
      "SELECT * FROM student_account WHERE student_id = ?",
      [req.params.id]
    );
    await db.close();

    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a student
router.put("/:id", async (req, res) => {
  try {
    const db = await getDbConnection();
    const { name, email } = req.body;
    await db.run(
      "UPDATE student_account SET name = ?, email = ? WHERE student_id = ?",
      [name, email, req.params.id]
    );
    await db.close();

    res.json({ message: "Student updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE student
router.delete("/:id", async (req, res) => {
  try {
    const db = await getDbConnection();
    await db.run(
      "DELETE FROM student_account WHERE student_id = ?",
      [req.params.id]
    );
    await db.close();

    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

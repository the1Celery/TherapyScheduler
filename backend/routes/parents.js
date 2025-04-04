const express = require("express");
const router = express.Router();
const db = require("../db");

// Create a parent
router.post("/", async (req, res) => {
  try {
    const { name, email, student_id } = req.body;
    const sql = "INSERT INTO parent_account (name, email, student_id) VALUES (?, ?, ?)";
    const [result] = await db.query(sql, [name, email, student_id]);
    res.json({ parent_id: result.insertId, name, email, student_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Grab all parents
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM parent_account");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Grab a single parent
router.get("/:id", async (req, res) => {
  try {
    const sql = "SELECT * FROM parent_account WHERE parent_id = ?";
    const [rows] = await db.query(sql, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Parent not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a parent
router.put("/:id", async (req, res) => {
  try {
    const { name, email, student_id } = req.body;
    const sql = `
      UPDATE parent_account
      SET name = ?, email = ?, student_id = ?
      WHERE parent_id = ?
    `;
    await db.query(sql, [name, email, student_id, req.params.id]);
    res.json({ message: "Parent updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a parent
router.delete("/:id", async (req, res) => {
  try {
    const sql = "DELETE FROM parent_account WHERE parent_id = ?";
    await db.query(sql, [req.params.id]);
    res.json({ message: "Parent deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
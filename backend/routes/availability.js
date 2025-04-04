const express = require("express");
const router = express.Router();
const db = require("../db");

// Create someone's availability
router.post("/", async (req, res) => {
  try {
    const { therapist_id, start_time, end_time, date } = req.body;
    const sql = `
      INSERT INTO availability (therapist_id, start_time, end_time, date)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [therapist_id, start_time, end_time, date]);
    res.json({ availability_id: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Grab everyones availability
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM availability");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Grab someone's availability
router.get("/:id", async (req, res) => {
  try {
    const sql = "SELECT * FROM availability WHERE availability_id = ?";
    const [rows] = await db.query(sql, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Availability not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Grab someone's availability
router.put("/:id", async (req, res) => {
  try {
    const { therapist_id, start_time, end_time, date } = req.body;
    const sql = `
      UPDATE availability
      SET therapist_id = ?, start_time = ?, end_time = ?, date = ?
      WHERE availability_id = ?
    `;
    await db.query(sql, [therapist_id, start_time, end_time, date, req.params.id]);
    res.json({ message: "Availability updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete someone's availability
router.delete("/:id", async (req, res) => {
  try {
    const sql = "DELETE FROM availability WHERE availability_id = ?";
    await db.query(sql, [req.params.id]);
    res.json({ message: "Availability deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
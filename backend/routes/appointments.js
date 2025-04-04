const express = require("express");
const router = express.Router();
const db = require("../db");

// Create an appointment
router.post("/", async (req, res) => {
  try {
    const {
      student_id,
      parent_id,
      therapist_id,
      time,
      date,
      status,
      type
    } = req.body;

    const sql = `
      INSERT INTO appointment
        (student_id, parent_id, therapist_id, time, date, status, type)
      VALUES
        (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
      student_id,
      parent_id,
      therapist_id,
      time,
      date,
      status,
      type
    ]);

    res.json({ appointment_id: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Grab all appointments
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM appointment");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Grab a single appointment
router.get("/:id", async (req, res) => {
  try {
    const sql = "SELECT * FROM appointment WHERE appointment_id = ?";
    const [rows] = await db.query(sql, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Appointment not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an appointment
router.put("/:id", async (req, res) => {
  try {
    const {
      student_id,
      parent_id,
      therapist_id,
      time,
      date,
      status,
      type
    } = req.body;

    const sql = `
      UPDATE appointment
      SET student_id = ?, parent_id = ?, therapist_id = ?,
          time = ?, date = ?, status = ?, type = ?
      WHERE appointment_id = ?
    `;

    await db.query(sql, [
      student_id,
      parent_id,
      therapist_id,
      time,
      date,
      status,
      type,
      req.params.id
    ]);

    res.json({ message: "Appointment updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an appointment
router.delete("/:id", async (req, res) => {
  try {
    const sql = "DELETE FROM appointment WHERE appointment_id = ?";
    await db.query(sql, [req.params.id]);
    res.json({ message: "Appointment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
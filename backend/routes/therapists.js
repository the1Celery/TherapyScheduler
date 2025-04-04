const express = require("express");
const router = express.Router();
const db = require("../db");

// Create a therapist
router.post("/", async (req, res) => {
  try {
    const { name, email, admin_id, approval_date } = req.body;
    const sql = `
      INSERT INTO therapist_account (name, email, admin_id, approval_date)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [name, email, admin_id, approval_date]);
    res.json({ therapist_id: result.insertId, name, email, admin_id, approval_date });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Grab ALL therapists
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM therapist_account");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Grab a single therapist
router.get("/:id", async (req, res) => {
  try {
    const sql = "SELECT * FROM therapist_account WHERE therapist_id = ?";
    const [rows] = await db.query(sql, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Therapist not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Upadate a therapist
router.put("/:id", async (req, res) => {
  try {
    const { name, email, admin_id, approval_date } = req.body;
    const sql = `
      UPDATE therapist_account
      SET name = ?, email = ?, admin_id = ?, approval_date = ?
      WHERE therapist_id = ?
    `;
    await db.query(sql, [name, email, admin_id, approval_date, req.params.id]);
    res.json({ message: "Therapist updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a therapist
router.delete("/:id", async (req, res) => {
  try {
    const sql = "DELETE FROM therapist_account WHERE therapist_id = ?";
    await db.query(sql, [req.params.id]);
    res.json({ message: "Therapist deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
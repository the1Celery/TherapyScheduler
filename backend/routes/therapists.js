const express = require("express");
const { getDbConnection } = require("../db");
const router = express.Router();

// Create a therapist
router.post("/", async (req, res) => {
  try {
    const db = await getDbConnection();
    const { first_name, last_name, email, password, admin_id, approval_date } = req.body;
    const sql = `
      INSERT INTO therapist_account
        (first_name, last_name, email, password, admin_id, approval_date)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const result = await db.run(sql, [
      first_name,
      last_name,
      email,
      password,
      admin_id,
      approval_date
    ]);
    await db.close();
    res.json({
      therapist_id: result.lastID,
      first_name,
      last_name,
      email,
      admin_id,
      approval_date
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Grab ALL therapists
router.get("/", async (req, res) => {
  try {
    const db = await getDbConnection();
    const rows = await db.all("SELECT * FROM therapist_account");
    await db.close();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Grab a single therapist
router.get("/:id", async (req, res) => {
  try {
    const db = await getDbConnection();
    const therapist = await db.get(
      "SELECT * FROM therapist_account WHERE therapist_id = ?",
      [req.params.id]
    );
    await db.close();
    if (!therapist) return res.status(404).json({ error: "Therapist not found" });
    res.json(therapist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a therapist
router.put("/:id", async (req, res) => {
  try {
    const db = await getDbConnection();
    const { first_name, last_name, email, admin_id, approval_date } = req.body;
    await db.run(
      `UPDATE therapist_account
         SET first_name = ?, last_name = ?, email = ?, admin_id = ?, approval_date = ?
       WHERE therapist_id = ?`,
      [first_name, last_name, email, admin_id, approval_date, req.params.id]
    );
    await db.close();
    res.json({ message: "Therapist updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a therapist
router.delete("/:id", async (req, res) => {
  try {
    const db = await getDbConnection();
    await db.run("DELETE FROM therapist_account WHERE therapist_id = ?", [
      req.params.id
    ]);
    await db.close();
    res.json({ message: "Therapist deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
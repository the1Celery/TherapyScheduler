const express = require("express");
const router = express.Router();
const db = require("../db");

// Create an admin
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const sql = "INSERT INTO admin_account (name) VALUES (?)";
    const [result] = await db.query(sql, [name]);
    res.json({ admin_id: result.insertId, name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Grab ALL admins
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM admin_account");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Grab a single admin by ID
router.get("/:id", async (req, res) => {
  try {
    const sql = "SELECT * FROM admin_account WHERE admin_id = ?";
    const [rows] = await db.query(sql, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Admin not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an admin
router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const sql = "UPDATE admin_account SET name = ? WHERE admin_id = ?";
    await db.query(sql, [name, req.params.id]);
    res.json({ message: "Admin updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an admin
router.delete("/:id", async (req, res) => {
  try {
    const sql = "DELETE FROM admin_account WHERE admin_id = ?";
    await db.query(sql, [req.params.id]);
    res.json({ message: "Admin deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
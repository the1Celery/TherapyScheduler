const express = require("express");
const { getDbConnection } = require("../db");
const router = express.Router();

// Create a parent
router.post("/", async (req, res) => {
  try {
    const db = await getDbConnection();
    const { first_name, last_name, email, password } = req.body;
    const sql = `
      INSERT INTO parent_account
        (first_name, last_name, email, password)
      VALUES (?, ?, ?, ?)
    `;
    const result = await db.run(sql, [
      first_name,
      last_name,
      email,
      password
    ]);
    await db.close();
    res.json({
      parent_id: result.lastID,
      first_name,
      last_name,
      email
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Grab all parents
router.get("/", async (req, res) => {
  try {
    const db = await getDbConnection();
    const rows = await db.all("SELECT * FROM parent_account");
    await db.close();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Grab a single parent
router.get("/:id", async (req, res) => {
  try {
    const db = await getDbConnection();
    const parent = await db.get(
      "SELECT * FROM parent_account WHERE parent_id = ?",
      [req.params.id]
    );
    await db.close();
    if (!parent) return res.status(404).json({ error: "Parent not found" });
    res.json(parent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a parent
router.put("/:id", async (req, res) => {
  try {
    const db = await getDbConnection();
    const { first_name, last_name, email } = req.body;
    await db.run(
      `UPDATE parent_account
         SET first_name = ?, last_name = ?, email = ?
       WHERE parent_id = ?`,
      [first_name, last_name, email, req.params.id]
    );
    await db.close();
    res.json({ message: "Parent updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a parent
router.delete("/:id", async (req, res) => {
  try {
    const db = await getDbConnection();
    await db.run("DELETE FROM parent_account WHERE parent_id = ?", [
      req.params.id
    ]);
    await db.close();
    res.json({ message: "Parent deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
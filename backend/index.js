require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { getDbConnection } = require("./db");
const studentRoutes      = require("./routes/students");
const parentRoutes       = require("./routes/parents");
const therapistRoutes    = require("./routes/therapists");
const appointmentRoutes  = require("./routes/appointments");
const availabilityRoutes = require("./routes/availability");
const adminRoutes        = require("./routes/admins");
const authRoutes         = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());
// Authentication routes
app.use("/api/auth", authRoutes);

// **Dev-only Migration: drop & recreate tables**
(async () => {
  try {
    const db = await getDbConnection();
    // Drop existing tables (WARNING: destructive)
    await db.run(`DROP TABLE IF EXISTS student_account`);
    await db.run(`DROP TABLE IF EXISTS parent_account`);
    await db.run(`DROP TABLE IF EXISTS therapist_account`);

    // Recreate student_account
    await db.run(`
      CREATE TABLE student_account (
        student_id   INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name   TEXT NOT NULL,
        last_name    TEXT NOT NULL,
        email        TEXT UNIQUE NOT NULL,
        password     TEXT NOT NULL
      )
    `);

    // Recreate parent_account
    await db.run(`
      CREATE TABLE parent_account (
        parent_id    INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name   TEXT NOT NULL,
        last_name    TEXT NOT NULL,
        email        TEXT UNIQUE NOT NULL,
        password     TEXT NOT NULL,
        student_id   INTEGER,
        FOREIGN KEY(student_id) REFERENCES student_account(student_id)
      )
    `);

    // Recreate therapist_account
    await db.run(`
      CREATE TABLE therapist_account (
        therapist_id   INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name     TEXT NOT NULL,
        last_name      TEXT NOT NULL,
        email          TEXT UNIQUE NOT NULL,
        password       TEXT NOT NULL,
        admin_id       INTEGER,
        approval_date  TEXT NOT NULL,
        FOREIGN KEY(admin_id) REFERENCES admin_account(admin_id)
      )
    `);

    await db.close();
    console.log("✅ Dev migration: tables dropped & recreated.");
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
})();

// API Routes
app.use("/api/students",      studentRoutes);
app.use("/api/parents",       parentRoutes);
app.use("/api/therapists",    therapistRoutes);
app.use("/api/appointments",  appointmentRoutes);
app.use("/api/availability",  availabilityRoutes);
app.use("/api/admins",        adminRoutes);

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Therapy Appointment Scheduler API is running!");
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

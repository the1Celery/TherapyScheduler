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
    await db.run(`DROP TABLE IF EXISTS appointments`);
    await db.run(`DROP TABLE IF EXISTS admin_account`);
    await db.run(`DROP TABLE IF EXISTS availability`);

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
      // Recreate appointments table
    await db.run(`
      CREATE TABLE appointments (
        appointment_id INTEGER PRIMARY KEY AUTOINCREMENT,
        family_id      INTEGER,
        student_id     INTEGER NOT NULL,
        therapist_id   INTEGER NOT NULL,
        start_time     TEXT NOT NULL,
        end_time       TEXT NOT NULL,
        date           TEXT NOT NULL,
        status         TEXT NOT NULL,
        type           TEXT NOT NULL,
        FOREIGN KEY(family_id)    REFERENCES parent_account(parent_id),
        FOREIGN KEY(student_id)   REFERENCES student_account(student_id),
        FOREIGN KEY(therapist_id) REFERENCES therapist_account(therapist_id)
      )
    `);
    // Recreate admin_account
    await db.run(`
      CREATE TABLE admin_account (
        admin_id   INTEGER PRIMARY KEY AUTOINCREMENT,
        email     TEXT UNIQUE NOT NULL,
        password  TEXT NOT NULL,
        name      TEXT NOT NULL,
        role      TEXT NOT NULL
      )
    `);
    // Recreate availability table
    await db.run(`
      CREATE TABLE availability (
        therapist_id INTEGER NOT NULL,
        date         TEXT NOT NULL,
        start_time   TEXT NOT NULL,
        end_time     TEXT NOT NULL,
        PRIMARY KEY (therapist_id, date, start_time),
        FOREIGN KEY (therapist_id) REFERENCES therapist_account(therapist_id)
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

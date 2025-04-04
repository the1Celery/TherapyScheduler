require("dotenv").config();
const express = require("express");
const cors = require("cors");

const db = require("./db");
const adminRoutes = require("./routes/admins");
const therapistRoutes = require("./routes/therapists");
const studentRoutes = require("./routes/students");
const parentRoutes = require("./routes/parents");
const appointmentRoutes = require("./routes/appointments");
const availabilityRoutes = require("./routes/availability");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/admins", adminRoutes);
app.use("/api/therapists", therapistRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/parents", parentRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/availability", availabilityRoutes);

// Example test route:
app.get("/", (req, res) => {
  res.send("Therapy Appointment Scheduler API is running!");
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
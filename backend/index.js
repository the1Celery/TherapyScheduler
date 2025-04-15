require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { getDbConnection } = require("./db");
const studentRoutes = require("./routes/students");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/students", studentRoutes);

// Example test route:
app.get("/", (req, res) => {
  res.send("Therapy Appointment Scheduler API is running!");
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
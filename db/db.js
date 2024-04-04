const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("db/sensor.db", (err) => {
  if (err) {
    console.error("Database error:", err);
  } else {
    console.log("Connected to the sensor database.");
  }
});

module.exports = db;

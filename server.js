const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();
app.set("view engine", "ejs");

const mqtt = require("mqtt");
const db = require("./db/db");

const client = mqtt.connect(process.env.MQTT_HOST, {
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PW,
  port: process.env.MQTT_PORT,
});

client.on("connect", () => {
  console.log("Connected to MQTT broker.");
  client.subscribe(process.env.MQTT_TOPIC, (err) => {
    if (!err) {
      console.log("MQTT subscription successful.");
    }
  });
});

client.on("error", (error) => {
  console.error("Connection error:", error);
});

client.on("message", (topic, message) => {
  const sensorId = "DS18B20-01";
  const messageStr = message.toString();
  const value = parseFloat(messageStr);

  if (!isNaN(value)) {
    logSensorData(sensorId, value);
  } else {
    console.error(`Received non-numeric data from ${topic}: ${messageStr}`);
  }
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard", { sensorData: messageStr });
});

app.get("/data", (req, res) => {
  res.json(value || {});
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Maker Hub app listening at http://localhost:${port}`);
});

/**
 * Logs sensor data to the database.
 *
 * @param {string} sensorId The ID of the sensor.
 * @param {float} value The sensor value to log.
 */
function logSensorData(sensorId, value) {
  const sql = `INSERT INTO logs (sensorId, value) VALUES (?, ?)`;

  db.run(sql, [sensorId, value], (err) => {
    if (err) {
      return console.error("Error inserting sensor log", err.message);
    }
    console.log(`A sensor log has been inserted with value: ${value}`);
  });
}

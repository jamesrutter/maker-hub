const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();
app.set('view engine', 'ejs');

const mqtt = require('mqtt');

console.log(process.env.MQTT_USER, process.env.MQTT_PW, process.env.MQTT_PORT);

const client = mqtt.connect('mqtt://localhost', {
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PW,
  port: process.env.MQTT_PORT,
});

let tempData = '';

client.on('connect', () => {
  console.log('Connected to MQTT broker.');
  client.subscribe('maker-hub/sensor', (err) => {
    if (!err) {
      console.log('MQTT subscription successful.');
    }
  });
});

client.on("error", (error) => {
  console.error("Connection error:", error);
});


client.on('message', (topic, message) => {
  console.log('Received message from topic: ' + topic);
  console.log('Message: ' + message.toString());
  tempDataStr = message.toString();
  tempDataNum = parseFloat(tempDataStr);
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard', { sensorData: tempDataStr });
});

app.get('/data', (req, res) => {
  res.json(tempDataNum || {});
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Maker Hub app listening at http://localhost:${port}`)
});

const express = require('express');
const app = express();
require('dotenv').config();
app.set('view engine', 'ejs');

const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost', {
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PW,
  port: process.env.MQTT_PORT,
});

let tempData = '';

client.on('connect', () => {
  console.log('Connected to MQTT broker.');
  client.subscribe('/maker-hub/sensor', (err) => {
    if (!err) {
      console.log('MQTT subscription successful.');
    }
  });
});

client.on('message', (topic, message) => {
  console.log('Received message from topic: ' + topic);
  console.log('Message: ' + message.toString());
  tempData = message.toString();
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard', { sensorData: tempData });
});

app.get('/data', (req, res) => {
  res.json(tempData || {});
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
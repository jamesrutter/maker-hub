-- Create the Sensors table
DROP TABLE IF EXISTS Sensors;
CREATE TABLE IF NOT EXISTS Sensors (
    sensorId TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    location TEXT,
    description TEXT
);

-- Create the SensorLogs table
DROP TABLE IF EXISTS SensorLogs;
CREATE TABLE IF NOT EXISTS SensorLogs (
    logId INTEGER PRIMARY KEY AUTOINCREMENT,
    sensorId TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    value REAL NOT NULL,
    FOREIGN KEY (sensorId) REFERENCES Sensors(sensorId)
);

-- Empty the tables
DELETE FROM SensorLogs;
DELETE FROM Sensors;

-- Seed the sensor table with data
INSERT INTO Sensors(sensorId, type, location, description)
    VALUES('DS18B20-01', 'Temperature', 'Flag Deck', 'A digital temperature sensor.');


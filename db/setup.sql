-- Ensure the Sensors table exists
CREATE TABLE IF NOT EXISTS Sensors (
    sensorId TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    location TEXT,
    description TEXT
);

-- Ensure the SensorLogs table exists
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

-- Seed the Sensors table with initial data
INSERT INTO Sensors(sensorId, type, location, description)
VALUES('DS18B20', 'Temperature', 'Flag Deck', 'A digital temperature sensor.');

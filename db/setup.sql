-- Ensure the Sensors table exists
CREATE TABLE IF NOT EXISTS sensors (
    sensorId TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    location TEXT,
    description TEXT
);

-- Ensure the SensorLogs table exists
CREATE TABLE IF NOT EXISTS logs (
    logId INTEGER PRIMARY KEY AUTOINCREMENT,
    sensorId TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    value REAL NOT NULL,
    FOREIGN KEY (sensorId) REFERENCES sensors(sensorId)
);

-- Empty the tables
DELETE FROM logs;
DELETE FROM sensors;

-- Seed the Sensors table with initial data
INSERT INTO sensors(sensorId, type, location, description)
VALUES('DS18B20-01', 'Temperature', 'Flag Deck', 'A digital temperature sensor.');

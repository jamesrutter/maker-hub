export function handleSensorData(data) {
    // Assuming the data is a stringified JSON object
    // {"value": 23.75}
    try {
        const sensorData = JSON.parse(data);
        const floatValue = parseFloat(sensorData.value);
        // Now you have the floating-point value, which you can store or further process
        console.log(floatValue);
        storeSensorData(floatValue);
    } catch (e) {
        console.error('Error parsing sensor data:', e);
    }
}

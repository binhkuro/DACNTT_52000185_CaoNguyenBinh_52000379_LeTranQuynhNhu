// deviceSimulation.js
// Bật tắt thiết bị trong nhà theo nhiệt độ môi trường
function simulateDevices(sensorData) {
    return {
        airConditioner: sensorData.temperature > 24 ? 'on' : 'off',
        heater: sensorData.temperature < 22 ? 'on' : 'off',
        humidifier: sensorData.humidity < 40 ? 'on' : 'off',
        dehumidifier: sensorData.humidity > 60 ? 'on' : 'off'
    };
}

module.exports = { simulateDevices };
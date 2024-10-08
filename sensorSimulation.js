// sensorSimulation.js
// Điều chỉnh nhiệt độ môi trường theo thiết bị trong nhà
function adjustSensorData(sensorData, deviceStatus) {
    if (deviceStatus.airConditioner === 'on') {
        sensorData.temperature -= 1; // Giảm nhiệt độ nếu máy lạnh bật
    } else if (deviceStatus.heater === 'on') {
        sensorData.temperature += 1; // Tăng nhiệt độ nếu máy sưởi bật
    }

    if (deviceStatus.humidifier === 'on') {
        sensorData.humidity += 1; // Tăng độ ẩm nếu máy tạo ẩm bật
    } else if (deviceStatus.dehumidifier === 'on') {
        sensorData.humidity -= 1; // Giảm độ ẩm nếu máy hút ẩm bật
    }

    return sensorData;
}

module.exports = { adjustSensorData };
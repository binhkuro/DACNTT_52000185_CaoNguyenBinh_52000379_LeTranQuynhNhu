const socket = io();

socket.on('sensorData', (data) => {
    document.getElementById('temperature').innerText = Math.round(data.temperature) + ' °C';
    document.getElementById('humidity').innerText = Math.round(data.humidity) + ' %';

    updateTemperatureColor(data.temperature);
    updateHumidityColor(data.humidity);
});

socket.on('deviceStatus', (status) => {
    updateDeviceStatusImage('airConditionerStatus', status.airConditioner);
    updateDeviceStatusImage('heaterStatus', status.heater);
    updateDeviceStatusImage('humidifierStatus', status.humidifier);
    updateDeviceStatusImage('dehumidifierStatus', status.dehumidifier);
});


function updateDeviceStatusImage(elementId, status) {
    var imageSrc = status === 'on' ? '/img/on.png' : '/img/off.png';
    document.getElementById(elementId).src = imageSrc;
}
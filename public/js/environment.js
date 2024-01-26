const socket = io();

socket.on('sensorData', (data) => {
    document.getElementById('temperature').innerText = Math.round(data.temperature) + ' °C';
    document.getElementById('humidity').innerText = Math.round(data.humidity) + ' %';

    updateTemperatureColor(data.temperature);
    updateHumidityColor(data.humidity);
});

socket.on('deviceStatus', (status) => {
    document.getElementById('airConditionerStatus').innerText = status.airConditioner;
    document.getElementById('heaterStatus').innerText = status.heater;
    document.getElementById('humidifierStatus').innerText = status.humidifier;
    document.getElementById('dehumidifierStatus').innerText = status.dehumidifier;
});

function updateTemperatureColor(temperature) {
    var tempValue = parseFloat(temperature);

    if (tempValue < 22) {
        document.querySelector('.temperature').style.backgroundColor = '#0000FF';
    } else if (tempValue >= 22 && tempValue <= 24) {
        document.querySelector('.temperature').style.backgroundColor = '#01FF01';
    } else if (tempValue > 24) {
        document.querySelector('.temperature').style.backgroundColor = '#FF0000';
    }
}

updateTemperatureColor(document.getElementById('temperature').innerText);

function updateHumidityColor(humidity) {
    var tmpValue = parseFloat(humidity);

    if (tmpValue < 40) {
        document.querySelector('.humidity').style.backgroundColor = '#FF0000';
    } else if (tmpValue >= 40 && tmpValue <= 60) {
        document.querySelector('.humidity').style.backgroundColor = '#01FF01';
    } else if (tmpValue > 60) {
        document.querySelector('.humidity').style.backgroundColor = '#FF0000';
    }
}

updateHumidityColor(document.getElementById('humidity').innerText);
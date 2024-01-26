const socket = io();

socket.on('petHealth', (data) => {
    document.getElementById('temperaturePet').innerText = data.temperaturePet.toFixed(2);
    document.getElementById('humidityPet').innerText = data.humidityPet.toFixed(2);
    document.getElementById('heartRate').innerText = data.heartRate;
    document.getElementById('activity').innerText = data.activity;
});
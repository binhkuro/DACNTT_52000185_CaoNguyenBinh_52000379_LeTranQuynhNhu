const socket = io();

socket.on('petHealth', (data) => {
    // Cập nhật các phần tử HTML với dữ liệu mới
    document.getElementById('temperaturePet').innerText = data.bodyTemperature.toFixed(2) + ' °C'; // Giả sử định dạng dữ liệu là số thập phân
    document.getElementById('humidityPet').innerText = data.humidity.toFixed(2) + ' %'; // Giả sử định dạng dữ liệu là số thập phân
    document.getElementById('heartRate').innerText = data.heartRate.toFixed(0) + ' bpm'; // Làm tròn đến số nguyên gần nhất
    document.getElementById('activity').innerText = data.activity.toFixed(0); // Làm tròn đến số nguyên gần nhất
});

socket.on('note', (notes) => {
    const warningsElement = document.getElementById('healthWarnings');
    warningsElement.innerHTML = ''; // Xóa cảnh báo cũ
    notes.forEach(note => {
        const li = document.createElement('li');
        li.innerText = note;
        warningsElement.appendChild(li);
    });
});
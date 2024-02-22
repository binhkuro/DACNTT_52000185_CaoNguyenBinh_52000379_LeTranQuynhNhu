const socket = io();

socket.on('petHealth', (data) => {
    // Cập nhật các phần tử HTML với dữ liệu mới
    document.getElementById('temperaturePet').innerText = data.bodyTemperature.toFixed(2) + ' °C'; // Giả sử định dạng dữ liệu là số thập phân
    document.getElementById('humidityPet').innerText = data.humidity.toFixed(2) + ' %'; // Giả sử định dạng dữ liệu là số thập phân
    document.getElementById('heartRate').innerText = data.heartRate.toFixed(0) + ' bpm'; // Làm tròn đến số nguyên gần nhất
    document.getElementById('activity').innerText = data.activity.toFixed(0); // Làm tròn đến số nguyên gần nhất
});

socket.on('note', (healthIssues) => {
    const warningsElement = document.getElementById('healthWarnings');
    warningsElement.innerHTML = ''; // Clear existing warnings

    healthIssues.forEach(issue => {
        const li = document.createElement('li');
        li.innerText = issue.warning; // Display warning text
        li.classList.add('clickable-warning'); // Add class for styling if necessary
        li.addEventListener('click', () => {
            // Update modal content with the specific suggestion for this issue
            document.getElementById('modalContent').innerText = issue.suggestion;
            // Open the modal
            var modalInstance = M.Modal.getInstance(document.getElementById('healthModal'));
            modalInstance.open();
        });
        warningsElement.appendChild(li);
    });
});

// Gọi hàm khởi tạo modal sau khi tải trang
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);
});
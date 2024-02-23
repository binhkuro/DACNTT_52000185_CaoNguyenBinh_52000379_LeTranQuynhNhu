const socket = io();

socket.on('petHealth', (data) => {
    // Cập nhật các phần tử HTML với dữ liệu mới
    document.getElementById('temperaturePet').innerText = data.bodyTemperature.toFixed(2) + ' °C'; // Giả sử định dạng dữ liệu là số thập phân
    document.getElementById('humidityPet').innerText = data.humidity.toFixed(2) + ' %'; // Giả sử định dạng dữ liệu là số thập phân
    document.getElementById('heartRate').innerText = data.heartRate.toFixed(0) + ' bpm'; // Làm tròn đến số nguyên gần nhất
    document.getElementById('activity').innerText = data.activity.toFixed(0); // Làm tròn đến số nguyên gần nhất
});

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    // Thêm sự kiện listener cho nút đóng 'x'
    var closeButtons = document.querySelectorAll('.modal .close');
    closeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var modal = button.closest('.modal');
            var instance = M.Modal.getInstance(modal);
            instance.close();
        });
    });
});


socket.on('note', (healthIssues) => {
    const warningsElement = document.getElementById('healthWarnings');
    warningsElement.innerHTML = ''; // Xóa cảnh báo hiện tại

    healthIssues.forEach(issue => {
        const li = document.createElement('li');
        li.innerText = issue.warning;
        li.classList.add('clickable-warning');
        li.addEventListener('click', () => {
            console.log('Cảnh báo được nhấn:', issue.warning); // Gỡ lỗi xem cảnh báo nào được nhấn

            const modalContent = document.getElementById('modalContent');
            let contentHtml = '<p>' + issue.suggestion + '</p>'; // Đảm bảo rằng đây là nội dung bạn muốn hiển thị

            if (issue.warning.includes('Nhiệt độ cơ thể thấp')) {
                contentHtml += `
<p>Nhiệt độ cơ thể của chó hiện tại là thấp, điều này có thể là dấu hiệu của việc không dung nạp lạnh tốt. Hãy thực hiện các biện pháp sau để giúp thú cưng của bạn:</p>
<ul>
    <li>Tăng nhiệt độ trong nhà hoặc nơi chó đang ở.</li>
    <li>Sử dụng chăn hoặc áo ấm cho chó để giữ nhiệt.</li>
    <li>Tránh để chó tiếp xúc với môi trường lạnh bên ngoài.</li>
    <li>Thăm bác sĩ thú y nếu tình trạng không cải thiện hoặc có dấu hiệu nghiêm trọng khác.</li>
</ul>
<p>Để biết thêm thông tin về nhiệt độ bình thường của chó và cách chăm sóc khi nhiệt độ cơ thể thấp, bạn có thể tham khảo <a href="https://thuythithi.com/than-nhiet-cua-cho-nhu-the-nao-la-binh-thuong/" target="_blank">tại đây</a>.</p>
<p>Nếu bạn có bất kỳ câu hỏi hoặc quan ngại, vui lòng liên hệ với bác sĩ thú y để được tư vấn cụ thể hơn.</p>
                `;
            }
            modalContent.innerHTML = contentHtml;

            var modal = document.getElementById('healthModal');
            var instance = M.Modal.getInstance(modal);
            if (instance) {
                instance.open();
            } else {
                console.error('Modal instance is not found.'); // Gỡ lỗi nếu instance không tìm thấy
            }
        });
        warningsElement.appendChild(li);
    });
});
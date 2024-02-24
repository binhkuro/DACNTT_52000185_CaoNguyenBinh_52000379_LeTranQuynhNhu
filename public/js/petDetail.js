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

            if (issue.warning.includes('Nhiệt độ cơ thể của chó thấp, cần giữ ấm. Xem thêm...')) {
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

            if (issue.warning.includes('Nhiệt độ cơ thể của chó cao, có thể cần làm mát. Xem thêm...')) {
                contentHtml += `
                <p>Nhiệt độ cơ thể của chó hiện tại là cao, điều này có thể là dấu hiệu của sốt hoặc tình trạng y tế cần được chú ý. Hãy thực hiện các biện pháp sau để giúp thú cưng của bạn:</p>
                <ul>
                    <li>Giảm nhiệt độ trong nhà hoặc nơi chó đang ở để tạo điều kiện mát mẻ hơn.</li>
                    <li>Sử dụng quạt hoặc máy lạnh để giảm nhiệt độ xung quanh, nhưng tránh làm lạnh quá mức.</li>
                    <li>Cung cấp nước sạch và tươi mới cho chó uống liên tục để giúp hạ nhiệt từ bên trong.</li>
                    <li>Áp dụng khăn mát hoặc bộ làm mát cơ thể chó nếu cần, nhưng hãy chú ý không làm lạnh quá đột ngột.</li>
                    <li>Tránh cho chó vận động mạnh hoặc tiếp xúc với nhiệt độ cao bên ngoài.</li>
                    <li>Thăm bác sĩ thú y ngay lập tức nếu nhiệt độ không giảm hoặc có dấu hiệu nghiêm trọng khác.</li>
                </ul>
                <p>Để biết thêm thông tin về nhiệt độ bình thường của chó và cách chăm sóc khi nhiệt độ cơ thể cao, bạn có thể tham khảo <a href="https://thuythithi.com/than-nhiet-cua-cho-nhu-the-nao-la-binh-thuong/" target="_blank">tại đây</a>.</p>
                <p>Nếu bạn có bất kỳ câu hỏi hoặc quan ngại, vui lòng liên hệ với bác sĩ thú y để được tư vấn cụ thể hơn.</p>
                `;
            }

            if (issue.warning.includes('Nhịp tim của chó cao, cần theo dõi thêm. Xem thêm...')) {
                contentHtml += `
                <p>Nhịp tim của chó hiện tại là cao, điều này có thể là dấu hiệu của căng thẳng, lo lắng, hoặc một tình trạng sức khỏe cần được chú ý. Hãy thực hiện các biện pháp sau để giúp thú cưng của bạn:</p>
                <ul>
                    <li>Tạo một môi trường yên tĩnh và thoải mái cho chó, tránh tiếng ồn lớn hoặc sự xáo trộn.</li>
                    <li>Thực hiện các hoạt động thư giãn như đi dạo nhẹ nhàng hoặc massage nhẹ nhàng để giúp chó bình tĩnh lại.</li>
                    <li>Cung cấp đủ nước uống để đảm bảo chó không bị mất nước, có thể góp phần làm tăng nhịp tim.</li>
                    <li>Tránh làm cho chó phải vận động mạnh hoặc tiếp xúc với nhiệt độ cao, nhất là khi nhận thấy nhịp tim đã cao.</li>
                    <li>Giảm bớt các kích thích từ môi trường xung quanh có thể khiến chó bị stress hoặc lo lắng.</li>
                    <li>Thăm bác sĩ thú y để kiểm tra sức khỏe tổng quát và tìm ra nguyên nhân của tình trạng nhịp tim cao, đồng thời nhận được hướng dẫn cụ thể.</li>
                </ul>
                <p>Để biết thêm thông tin về nhịp tim bình thường của chó và cách chăm sóc khi nhịp tim cao, bạn có thể tham khảo <a href="https://trumboss.com/nhip-tim-bat-thuong-o-cho/" target="_blank">tại đây</a>.</p>
                <p>Nếu bạn có bất kỳ câu hỏi hoặc quan ngại, vui lòng liên hệ với bác sĩ thú y để được tư vấn cụ thể hơn.</p>
                `;
            }

            if (issue.warning.includes('Nhịp tim của chó thấp, cần theo dõi thêm. Xem thêm...')) {
                contentHtml += `
                <p>Nhịp tim của chó hiện tại là thấp, điều này có thể là dấu hiệu của tình trạng sức khỏe không ổn định hoặc sự bình tĩnh quá mức. Hãy thực hiện các biện pháp sau để giúp thú cưng của bạn:</p>
                <ul>
                    <li>Đảm bảo chó được nghỉ ngơi trong một môi trường yên tĩnh và thoải mái.</li>
                    <li>Tránh làm chó phải tham gia vào các hoạt động vận động mạnh hoặc căng thẳng.</li>
                    <li>Giữ cho chó ấm áp, nhất là trong môi trường lạnh, vì nhiệt độ thấp có thể làm giảm nhịp tim.</li>
                    <li>Quan sát và ghi chép lại bất kỳ dấu hiệu bất thường nào khác, như sự thay đổi trong hành vi, ăn uống, hoặc khả năng vận động.</li>
                    <li>Thăm bác sĩ thú y ngay lập tức để kiểm tra và xác định nguyên nhân, đặc biệt nếu nhịp tim thấp đi kèm với các dấu hiệu sức khỏe khác không bình thường.</li>
                </ul>
                <p>Để biết thêm thông tin về nhịp tim bình thường của chó và cách chăm sóc khi nhịp tim thấp, bạn có thể tham khảo <a href="https://trumboss.com/nhip-tim-bat-thuong-o-cho/" target="_blank">tại đây</a>.</p>
                <p>Nếu bạn có bất kỳ câu hỏi hoặc quan ngại, vui lòng liên hệ với bác sĩ thú y để được tư vấn cụ thể hơn.</p>
                `;
            }

            if (issue.warning.includes('Độ ẩm cơ thể của chó cao, cần giảm độ ẩm môi trường. Xem thêm...')) {
                contentHtml += `
                <p>Độ ẩm của da và lông chó cao có thể là dấu hiệu của môi trường sống không phù hợp hoặc vấn đề sức khỏe cần được chú ý. Hãy thực hiện các biện pháp sau để giúp thú cưng của bạn:</p>
                <ul>
                    <li>Đảm bảo môi trường sống của chó khô ráo và thoáng đãng, tránh độ ẩm cao trong nhà hoặc khu vực chó thường xuyên ở.</li>
                    <li>Sử dụng máy hút ẩm trong nhà nếu cần thiết để kiểm soát độ ẩm trong không khí.</li>
                    <li>Chăm sóc lông của chó đúng cách, bao gồm việc chải lông thường xuyên và tắm cho chó với khoảng thời gian hợp lý, không quá thường xuyên để tránh làm tăng độ ẩm.</li>
                    <li>Thay đổi chất lót hoặc giường của chó thường xuyên để đảm bảo nó khô ráo và sạch sẽ.</li>
                    <li>Đảm bảo chó được uống đủ nước sạch để duy trì sức khỏe tốt từ bên trong, điều này cũng có thể giúp cải thiện tình trạng da và lông.</li>
                    <li>Thăm bác sĩ thú y để kiểm tra tình trạng sức khỏe của chó, đặc biệt nếu bạn nghi ngờ độ ẩm cao có liên quan đến bệnh da hoặc vấn đề sức khỏe khác.</li>
                </ul>
                <p>Để biết thêm thông tin về cách chăm sóc da và lông của chó, cũng như các vấn đề sức khỏe liên quan đến độ ẩm cao, bạn có thể tham khảo <a href="https://thuythithi.com/cham-soc-da-va-long-cho/" target="_blank">tại đây</a>.</p>
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
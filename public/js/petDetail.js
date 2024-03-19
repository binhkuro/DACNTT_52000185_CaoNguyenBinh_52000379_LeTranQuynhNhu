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
            let contentHtml = '<p>' + issue.suggestion + '</p>';

            if (issue.warning.includes('Nhiệt độ cơ thể của chó thấp, cần giữ ấm. Xem thêm...')) {
                contentHtml += `
                <p>Nhiệt độ cơ thể của chó hiện tại là thấp, điều này có thể là dấu hiệu của việc không dung nạp lạnh tốt. Hãy thực hiện các biện pháp sau để giúp thú cưng của bạn:</p>
                <ul>
                    <li>Tăng nhiệt độ trong nhà hoặc nơi chó đang ở.</li>
                    <li>Sử dụng chăn hoặc áo ấm cho chó để giữ nhiệt.</li>
                    <li>Tránh để chó tiếp xúc với môi trường lạnh bên ngoài.</li>
                    <li>Thăm bác sĩ thú y nếu tình trạng không cải thiện hoặc có dấu hiệu nghiêm trọng khác.</li>
                </ul>
                <p>Để biết thêm thông tin về nhiệt độ bình thường của chó và cách chăm sóc khi nhiệt độ cơ thể thấp, bạn có thể tham khảo <a href="https://thuythithi.com/trieu-chung-ha-than-nhiet-o-cho-nguyen-nhan-va-cach-xu-ly/" target="_blank">tại đây</a>.</p>
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
                <p>Để biết thêm thông tin về nhiệt độ bình thường của chó và cách chăm sóc khi nhiệt độ cơ thể cao, bạn có thể tham khảo <a href="https://viphapet.com/blogs/cham-soc-cho/cho-bi-sot-va-cach-xu-ly-dung-cach" target="_blank">tại đây</a>.</p>
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
                <p>Để biết thêm thông tin về cách chăm sóc da và lông của chó, cũng như các vấn đề sức khỏe liên quan đến độ ẩm cao, bạn có thể tham khảo <a href="https://greenvet.com.vn/benh-viem-da-o-cho" target="_blank">tại đây</a>.</p>
                <p>Nếu bạn có bất kỳ câu hỏi hoặc quan ngại, vui lòng liên hệ với bác sĩ thú y để được tư vấn cụ thể hơn.</p>
                `;
            }

            if (issue.warning.includes('Độ ẩm cơ thể của chó thấp, cần tăng độ ẩm môi trường. Xem thêm...')) {
                contentHtml += `
                <p>Độ ẩm của da và lông chó thấp có thể là dấu hiệu của tình trạng khô da, dẫn đến ngứa, gãi, và có thể là rụng lông. Để giúp cải thiện tình trạng này cho thú cưng của bạn, hãy thực hiện các biện pháp sau:</p>
                <ul>
                    <li>Sử dụng loại dầu tắm hoặc dầu gội đặc biệt dành cho chó có da khô, giúp cung cấp độ ẩm cần thiết cho da và lông.</li>
                    <li>Thêm các loại thực phẩm giàu Omega-3 và Omega-6 vào chế độ ăn của chó, hoặc sử dụng các loại bổ sung dầu cá, giúp nuôi dưỡng da từ bên trong.</li>
                    <li>Tránh tắm chó quá thường xuyên với nước nóng và xà phòng mạnh, vì chúng có thể loại bỏ dầu tự nhiên trên da, làm tăng tình trạng khô da.</li>
                    <li>Sử dụng máy tạo ẩm trong nhà để tăng độ ẩm không khí, đặc biệt trong mùa đông hoặc trong điều kiện khí hậu khô hanh.</li>
                    <li>Massage da và lông chó bằng dầu dưỡng ẩm chuyên dụng cho chó, giúp cải thiện độ ẩm và tăng cường sự mềm mại của lông.</li>
                    <li>Thăm bác sĩ thú y để kiểm tra và nhận được lời khuyên cụ thể nếu tình trạng khô da kéo dài hoặc chó có dấu hiệu khó chịu, ngứa ngáy nghiêm trọng.</li>
                </ul>
                <p>Để biết thêm thông tin về cách chăm sóc da và lông chó, cũng như các vấn đề sức khỏe liên quan đến độ ẩm thấp, bạn có thể tham khảo <a href="https://thichthucung.com/kho-da-o-cho/" target="_blank">tại đây</a>.</p>
                <p>Nếu bạn có bất kỳ câu hỏi hoặc quan ngại, vui lòng liên hệ với bác sĩ thú y để được tư vấn cụ thể hơn.</p>
                `;
            }

            if (issue.warning.includes('Nhiệt độ cơ thể của mèo cao, có thể cần làm mát. Xem thêm...')) {
                contentHtml += `
                <p>Nhiệt độ cơ thể của mèo hiện tại cao hơn mức bình thường có thể là dấu hiệu của sốt hoặc một tình trạng y tế nghiêm trọng cần được xem xét. Để giúp thú cưng của bạn, hãy thực hiện các biện pháp sau:</p>
                <ul>
                    <li>Giảm nhiệt độ trong nhà hoặc khu vực mèo sinh hoạt bằng cách sử dụng quạt hoặc máy lạnh để tạo môi trường mát mẻ hơn.</li>
                    <li>Cung cấp đủ nước uống cho mèo để giúp hạ nhiệt độ cơ thể từ bên trong và tránh tình trạng mất nước.</li>
                    <li>Tránh để mèo tiếp xúc trực tiếp với ánh nắng mặt trời hoặc nhiệt độ cao, đặc biệt trong những ngày nắng nóng.</li>
                    <li>Sử dụng khăn mát hoặc băng lạnh nhẹ nhàng áp dụng lên vùng cổ hoặc bụng của mèo để giúp giảm nhiệt độ. Tuy nhiên, hãy chú ý không làm lạnh quá đột ngột.</li>
                    <li>Giữ cho môi trường sống của mèo sạch sẽ và thoáng đãng, tránh tình trạng ẩm ướt có thể làm tăng nhiệt độ cơ thể.</li>
                    <li>Thăm bác sĩ thú y ngay lập tức để xác định nguyên nhân và nhận điều trị phù hợp nếu nhiệt độ cơ thể mèo không giảm hoặc có các triệu chứng khác biểu hiện.</li>
                </ul>
                <p>Để biết thêm thông tin về nhiệt độ bình thường của mèo và cách chăm sóc khi nhiệt độ cơ thể cao, bạn có thể tham khảo <a href="https://www.petmart.vn/dau-hieu-nhan-biet-meo-bi-sot-bo-an-va-ha-than-nhiet" target="_blank">tại đây</a>.</p>
                <p>Nếu bạn có bất kỳ câu hỏi hoặc quan ngại, vui lòng liên hệ với bác sĩ thú y để được tư vấn cụ thể hơn.</p>
                `;
            }

            if (issue.warning.includes('Nhiệt độ cơ thể của mèo thấp, cần giữ ấm. Xem thêm...')) {
                contentHtml += `
                <p>Nhiệt độ cơ thể của mèo thấp hơn mức bình thường có thể là dấu hiệu của hypothermia (hạ thân nhiệt) hoặc một tình trạng sức khỏe nghiêm trọng khác cần được chú ý. Để giúp thú cưng của bạn, hãy thực hiện các biện pháp sau:</p>
                <ul>
                    <li>Tăng nhiệt độ trong nhà hoặc khu vực mèo sinh hoạt bằng cách sử dụng máy sưởi hoặc giữ ấm không gian sống của chúng.</li>
                    <li>Sử dụng chăn ấm, áo ấm cho mèo hoặc tạo một "tổ ấm" bằng cách sử dụng giường mèo ấm áp và thoải mái để giữ nhiệt cho cơ thể mèo.</li>
                    <li>Tránh để mèo tiếp xúc với môi trường lạnh bên ngoài hoặc giữ mèo trong nhà ở nơi khô ráo và ấm áp.</li>
                    <li>Chắc chắn rằng mèo đang nhận đủ dinh dưỡng và nước uống để duy trì năng lượng và sức khỏe, giúp cơ thể tự sản sinh nhiệt.</li>
                    <li>Nếu mèo có dấu hiệu lạnh run hoặc không hoạt động, hãy sưởi ấm cho mèo một cách nhẹ nhàng bằng cách sử dụng túi nước ấm hoặc gối sưởi (chú ý không làm quá nóng).</li>
                    <li>Thăm bác sĩ thú y ngay lập tức để xác định nguyên nhân và nhận điều trị phù hợp nếu nhiệt độ cơ thể mèo không cải thiện hoặc bạn phát hiện các dấu hiệu sức khỏe khác đáng lo ngại.</li>
                </ul>
                <p>Để biết thêm thông tin về nhiệt độ bình thường của mèo và cách chăm sóc khi nhiệt độ cơ thể thấp, bạn có thể tham khảo <a href="https://helicorp.vn/bookcase/detail/meo-bi-ha-than-nhiet-va-cach-xu-ly" target="_blank">tại đây</a>.</p>
                <p>Nếu bạn có bất kỳ câu hỏi hoặc quan ngại, vui lòng liên hệ với bác sĩ thú y để được tư vấn cụ thể hơn.</p>
                `;
            }

            if (issue.warning.includes('Độ ẩm cơ thể của mèo thấp, cần tăng độ ẩm môi trường. Xem thêm...')) {
                contentHtml += `
                <p>Độ ẩm thấp của da và lông mèo có thể gây ra tình trạng khô da, ngứa, và làm tăng nguy cơ rụng lông. Để giúp cải thiện tình trạng này cho thú cưng của bạn, hãy thực hiện các biện pháp sau:</p>
                <ul>
                    <li>Sử dụng loại dầu tắm hoặc dầu gội có chất dưỡng ẩm cao, được thiết kế đặc biệt cho mèo, giúp cung cấp độ ẩm cần thiết cho da và lông.</li>
                    <li>Bổ sung vào chế độ ăn của mèo các loại thực phẩm giàu Omega-3 và Omega-6, hoặc cung cấp các loại bổ sung dưỡng chất dành riêng cho mèo để giúp nuôi dưỡng da từ bên trong.</li>
                    <li>Tránh tắm mèo quá thường xuyên, vì việc này có thể làm mất dầu tự nhiên trên da, gây khô da và tăng cường tình trạng mất độ ẩm.</li>
                    <li>Sử dụng máy tạo ẩm trong nhà, đặc biệt trong mùa đông hoặc khi sử dụng điều hòa nhiệt độ, để giữ cho không khí có đủ độ ẩm, giúp da và lông mèo không bị khô.</li>
                    <li>Chải lông mèo thường xuyên để giúp phân phối dầu tự nhiên trên da, giúp duy trì độ ẩm và sức khỏe cho lông mèo.</li>
                    <li>Thăm bác sĩ thú y để kiểm tra và nhận được lời khuyên cụ thể nếu tình trạng da khô của mèo không cải thiện hoặc nếu bạn quan sát thấy các dấu hiệu bất thường khác.</li>
                </ul>
                <p>Để biết thêm thông tin về cách chăm sóc da và lông mèo, cũng như các vấn đề sức khỏe liên quan đến độ ẩm thấp, bạn có thể tham khảo <a href="https://petshopsaigon.vn/tin-tuc/meo-bi-kho-da" target="_blank">tại đây</a>.</p>
                <p>Nếu bạn có bất kỳ câu hỏi hoặc quan ngại, vui lòng liên hệ với bác sĩ thú y để được tư vấn cụ thể hơn.</p>
                `;
            }

            if (issue.warning.includes('Độ ẩm cơ thể của mèo cao, cần giảm độ ẩm môi trường. Xem thêm...')) {
                contentHtml += `
                <p>Độ ẩm cao của da và lông mèo có thể gây ra các vấn đề như nấm da, vi khuẩn, hoặc các bệnh ngoài da khác, làm ảnh hưởng đến sức khỏe và sự thoải mái của thú cưng. Để giúp cải thiện tình trạng này cho thú cưng của bạn, hãy thực hiện các biện pháp sau:</p>
                <ul>
                    <li>Đảm bảo môi trường sống của mèo khô ráo và thoáng đãng, tránh độ ẩm cao có thể gây hại cho da và lông.</li>
                    <li>Sử dụng máy hút ẩm trong nhà nếu cần, để kiểm soát độ ẩm trong không khí, đặc biệt trong những môi trường ẩm ướt.</li>
                    <li>Chăm sóc lông mèo đúng cách, bao gồm việc chải lông thường xuyên và tắm cho mèo với khoảng thời gian hợp lý, tránh tắm quá thường xuyên có thể tăng độ ẩm.</li>
                    <li>Thay đổi chất lót hoặc giường của mèo thường xuyên để đảm bảo chúng luôn khô ráo và sạch sẽ, giảm nguy cơ phát triển vi khuẩn và nấm do độ ẩm.</li>
                    <li>Giữ cho khu vực chóng ẩm như nhà vệ sinh mèo sạch sẽ và khô ráo, tránh sự phát triển của vi khuẩn và nấm.</li>
                    <li>Thăm bác sĩ thú y để kiểm tra tình trạng sức khỏe của mèo, đặc biệt nếu bạn nghi ngờ độ ẩm cao có liên quan đến các vấn đề da liễu hoặc nếu tình trạng da của mèo không cải thiện.</li>
                </ul>
                <p>Để biết thêm thông tin về cách chăm sóc da và lông mèo, cũng như các vấn đề sức khỏe liên quan đến độ ẩm cao, bạn có thể tham khảo <a href="https://khoathuy.vnua.edu.vn/3966/#:~:text=Nguy%C3%AAn%20nh%C3%A2n%20m%C3%A8o%20b%E1%BB%8B%20n%E1%BA%A5m%20da%3A&text=N%E1%BA%BFu%20m%C3%A8o%20kh%C3%B4ng%20%C4%91%C6%B0%E1%BB%A3c%20s%C6%B0%E1%BB%9Fi,th%E1%BB%83%20d%E1%BA%ABn%20%C4%91%E1%BA%BFn%20b%E1%BB%87nh%20n%C3%A0y." target="_blank">tại đây</a>.</p>
                <p>Nếu bạn có bất kỳ câu hỏi hoặc quan ngại, vui lòng liên hệ với bác sĩ thú y để được tư vấn cụ thể hơn.</p>
                `;
            }

            if (issue.warning.includes('Nhịp tim của mèo thấp, cần theo dõi thêm. Xem thêm...')) {
                contentHtml += `
                <p>Nhịp tim thấp ở mèo có thể là dấu hiệu của một số tình trạng sức khỏe không bình thường, cần được chú ý và xử lý cẩn thận. Để giúp thú cưng của bạn, hãy thực hiện các biện pháp sau:</p>
                <ul>
                    <li>Giữ mèo trong một môi trường yên tĩnh và thoải mái, tránh stress hoặc lo lắng có thể góp phần làm giảm nhịp tim.</li>
                    <li>Đảm bảo mèo có đủ nước uống và chế độ ăn cân đối, giàu dinh dưỡng để hỗ trợ sức khỏe tim mạch.</li>
                    <li>Tránh làm mèo phải vận động mạnh hoặc tiếp xúc với nhiệt độ cực đoan, vì điều này có thể ảnh hưởng tiêu cực đến nhịp tim.</li>
                    <li>Thường xuyên theo dõi và ghi chép nhịp tim của mèo, cũng như bất kỳ triệu chứng bất thường nào khác như: sự thiếu hoạt động, khó thở, hoặc mất phản xạ.</li>
                    <li>Thăm bác sĩ thú y để kiểm tra sức khỏe tổng quát, bao gồm kiểm tra tim mạch và các xét nghiệm cần thiết khác để xác định nguyên nhân của tình trạng nhịp tim thấp và nhận hướng dẫn điều trị phù hợp.</li>
                </ul>
                <p>Để biết thêm thông tin về nhịp tim bình thường của mèo và cách chăm sóc khi nhịp tim thấp, bạn có thể tham khảo <a href="https://petto.vn/meo/benh-o-meo/roi-loan-nhip-tim-o-meo-nguyen-nhan-chan-doan-dieu-tri/" target="_blank">tại đây</a>.</p>
                <p>Nếu bạn có bất kỳ câu hỏi hoặc quan ngại, vui lòng liên hệ với bác sĩ thú y để được tư vấn cụ thể hơn.</p>
                `;
            }

            if (issue.warning.includes('Nhịp tim của mèo cao, cần theo dõi thêm. Xem thêm...')) {
                contentHtml += `
                <p>Nhịp tim cao ở mèo có thể là dấu hiệu của stress, lo lắng, hoặc một vấn đề sức khỏe nghiêm trọng cần được giải quyết. Để giúp thú cưng của bạn, hãy thực hiện các biện pháp sau:</p>
                <ul>
                    <li>Giữ môi trường sống của mèo yên tĩnh và thoải mái, giảm thiểu các yếu tố gây stress hoặc kích động.</li>
                    <li>Thực hiện các hoạt động nhẹ nhàng với mèo, như chơi các trò chơi không đòi hỏi nhiều vận động mạnh, giúp chúng bình tĩnh và giảm nhịp tim.</li>
                    <li>Đảm bảo mèo có đủ nước uống và chế độ ăn cân đối, giàu dinh dưỡng để hỗ trợ sức khỏe tổng thể và tim mạch.</li>
                    <li>Tránh bất kỳ hoạt động nào có thể gây quá tải cho tim mèo, nhất là nếu bạn nhận thấy nhịp tim của chúng cao hơn bình thường.</li>
                    <li>Thăm bác sĩ thú y để kiểm tra sức khỏe tim mạch của mèo, bao gồm kiểm tra nhịp tim và thực hiện các xét nghiệm cần thiết khác để xác định nguyên nhân nhịp tim cao và nhận hướng dẫn điều trị phù hợp.</li>
                </ul>
                <p>Để biết thêm thông tin về nhịp tim bình thường của mèo và cách chăm sóc khi nhịp tim cao, bạn có thể tham khảo <a href="https://vpet.vn/blog/nhip-tim-nhanh-o-meo-bao-hieu-dieu-gi-649" target="_blank">tại đây</a>.</p>
                <p>Nếu bạn có bất kỳ câu hỏi hoặc quan ngại, vui lòng liên hệ với bác sĩ thú y để được tư vấn cụ thể hơn.</p>
                `;
            }

            if (issue.warning.includes('Thú cưng khỏe mạnh.')) {
                contentHtml += `
                <p>Khi thú cưng của bạn khỏe mạnh, đây là dấu hiệu cho thấy bạn đã cung cấp một môi trường sống tốt và chăm sóc đúng cách cho chúng. Để duy trì tình trạng sức khỏe tốt này, bạn nên thực hiện các biện pháp sau:</p>
                <ul>
                    <li>Đảm bảo thú cưng của bạn tiếp tục có một chế độ ăn cân đối và đầy đủ dinh dưỡng, phù hợp với nhu cầu cụ thể của từng loại thú cưng.</li>
                    <li>Thực hiện các hoạt động vận động đều đặn để đảm bảo thú cưng giữ được sức khỏe thể chất và tinh thần tốt. Điều này có thể bao gồm việc đi dạo, chơi các trò chơi, hoặc các hoạt động phù hợp khác dành cho thú cưng của bạn.</li>
                    <li>Thực hiện các cuộc kiểm tra sức khỏe định kỳ với bác sĩ thú y, bao gồm tiêm phòng, kiểm tra sức khỏe tổng quát, và xử lý các vấn đề sức khỏe ngay từ khi chúng mới bắt đầu.</li>
                    <li>Giữ môi trường sống của thú cưng sạch sẽ và an toàn, tránh các nguy cơ tiềm ẩn có thể gây hại cho sức khỏe của chúng.</li>
                    <li>Chú ý đến hành vi và tình trạng sức khỏe của thú cưng, bao gồm ăn uống, uống nước, vận động, và thói quen vệ sinh để kịp thời phát hiện bất kỳ dấu hiệu bất thường nào.</li>
                    <li>Cung cấp đủ nước uống sạch, giữ cho chúng được hydrat hóa tốt, đặc biệt trong mùa nóng hoặc sau khi vận động.</li>
                    <li>Giáo dục bản thân về nhu cầu và cách chăm sóc đặc biệt cho loại thú cưng của bạn, để bạn có thể phản ứng nhanh chóng và phù hợp với mọi tình huống sức khỏe có thể xảy ra.</li>
                </ul>
                <p>Việc duy trì sức khỏe tốt cho thú cưng không chỉ giúp chúng có một cuộc sống hạnh phúc và thoải mái mà còn giảm thiểu gánh nặng về mặt tài chính và tinh thần cho chủ sở hữu. Đầu tư vào sức khỏe của thú cưng là đầu tư vào hạnh phúc và sự yên tâm lâu dài của bạn.</p>
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
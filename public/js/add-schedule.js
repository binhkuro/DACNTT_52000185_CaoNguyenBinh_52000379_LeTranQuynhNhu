document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector(".add-schedule"); // Sửa lại selector nếu cần
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của việc gửi form

        var formData = new FormData(form);
        fetch('/add-schedule', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                if (data.success) {
                    window.location.href = '/schedule';
                } else {
                    // Xử lý trường hợp dữ liệu không thành công
                    console.error('Form submission was not successful:', data);
                }
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    });
});
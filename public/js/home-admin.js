document.addEventListener('DOMContentLoaded', function() {
    // Biểu đồ số lượng người dùng
    var ctxUser = document.getElementById('myAreaChart').getContext('2d');
    var myAreaChart = new Chart(ctxUser, {
        type: 'line', // Loại biểu đồ
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'], // Các nhãn trục X
            datasets: [{
                label: 'Người Dùng',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                data: [0, 10, 5, 2, 20, 30, 45], // Dữ liệu biểu đồ
            }]
        },
        options: {}
    });

    // Biểu đồ số lượng thú cưng
    var ctxPet = document.getElementById('myBarChart').getContext('2d');
    var myBarChart = new Chart(ctxPet, {
        type: 'bar', // Loại biểu đồ
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'], // Các nhãn trục X
            datasets: [{
                label: 'Thú Cưng',
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                data: [5, 15, 10, 30, 20, 40, 60], // Dữ liệu biểu đồ
            }]
        },
        options: {}
    });
});
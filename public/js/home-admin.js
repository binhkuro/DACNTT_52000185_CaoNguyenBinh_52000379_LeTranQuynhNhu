document.addEventListener('DOMContentLoaded', function() {
    var petDataPerUser = {
        "Người Dùng 1": 2,
        "Người Dùng 2": 3,
        "Người Dùng 3": 1
    };

    var dogCatComparisonData = {
        "Chó": dogCount,
        "Mèo": catCount
    };

    // Biểu đồ số lượng thú cưng theo người dùng
    var ctx1 = document.getElementById('myChart1').getContext('2d');
    var myChart1 = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: Object.keys(petDataPerUser),
            datasets: [{
                label: 'Số lượng thú cưng',
                data: Object.values(petDataPerUser),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Biểu đồ so sánh số lượng chó, mèo
    var ctx2 = document.getElementById('myChart2').getContext('2d');
    var myChart2 = new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: Object.keys(dogCatComparisonData),
            datasets: [{
                label: 'Số lượng',
                data: Object.values(dogCatComparisonData),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        }
    });
});
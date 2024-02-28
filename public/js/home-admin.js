document.addEventListener('DOMContentLoaded', function() {
    // Biểu đồ số lượng người dùng theo thú cưng
    var ctx1 = document.getElementById('myChart1').getContext('2d');
    var myChart1 = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: Object.keys(userPetData),
            datasets: [{
                label: 'Số lượng người dùng',
                data: Object.values(userPetData),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            legend: {
                display: false
            }
        }
    });

    var dogCatComparisonData = {
        "Chó": dogCount,
        "Mèo": catCount
    };

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
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)'
                ],
                borderWidth: 1
            }]
        }
    });
});
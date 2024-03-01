document.addEventListener('DOMContentLoaded', function() {
    var ctx = document.getElementById('petAgeChart').getContext('2d');
    var petAgeChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Chó', 'Mèo'],
            datasets: [{
                label: 'Tuổi trung bình',
                data: [averagePetAge['Chó'], averagePetAge['Mèo']],
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
});
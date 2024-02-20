// Thông tin sức khỏe được dự đoán nhờ chỉ số cảm biến sức khỏe thú cưng
function analyzePetHealth(data) {
    let healthIssues = [];

    if (data.activity < 0) {
        healthIssues.push('Thú cưng có thể đang cảm thấy mệt mỏi hoặc không khỏe.');
    }

    if (data.heartRate > 120 || data.heartRate < 60) {
        healthIssues.push('Có vấn đề với nhịp tim, cần theo dõi thêm.');
    }

    if (data.bodyTemperature > 39.2 || data.bodyTemperature < 38) {
        healthIssues.push('Nhiệt độ cơ thể không bình thường, cần chú ý.');
    }

    if (data.humidity < 30 || data.humidity > 70) {
        healthIssues.push('Độ ẩm không lý tưởng cho da và lông của thú cưng.');
    }

    return healthIssues.length > 0 ? healthIssues : ['Thú cưng khỏe mạnh.'];
}

module.exports = { analyzePetHealth };
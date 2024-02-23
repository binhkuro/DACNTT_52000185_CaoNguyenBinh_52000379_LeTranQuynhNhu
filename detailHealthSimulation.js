// Thông tin sức khỏe được dự đoán nhờ chỉ số cảm biến sức khỏe thú cưng
function analyzePetHealth(data, type) {
    let healthIssues = [];
    if (type === "Chó") {
        if (data.heartRate < 60) {
            healthIssues.push({
                warning: 'Có vấn đề với nhịp tim, cần theo dõi thêm.',
                suggestion: ''
            });
        }

        if (data.heartRate > 120) {
            healthIssues.push({
                warning: 'Có vấn đề với nhịp tim, cần theo dõi thêm.',
                suggestion: ''
            });
        }

        if (data.bodyTemperature < 37.4) {
            healthIssues.push({
                warning: 'Nhiệt độ cơ thể thấp, cần giữ ấm.',
                suggestion: ''
            });
        }

        if (data.bodyTemperature > 39.3) {
            healthIssues.push({
                warning: 'Nhiệt độ cơ thể cao, có thể cần làm mát.',
                suggestion: ''
            });
        }

        if (data.humidity < 40) {
            healthIssues.push({
                warning: 'Độ ẩm cơ thể thấp, cần tăng độ ẩm môi trường.',
                suggestion: ''
            });
        }

        if (data.humidity > 60) {
            healthIssues.push({
                warning: 'Độ ẩm môi trường, cần giảm độ ẩm môi trường.',
                suggestion: ''
            });
        }
    }

    if (type === "Mèo") {
        if (data.heartRate < 140) {
            healthIssues.push({
                warning: 'Có vấn đề với nhịp tim, cần theo dõi thêm. Xem thêm...',
                suggestion: ''
            });
        }

        if (data.heartRate > 220) {
            healthIssues.push({
                warning: 'Có vấn đề với nhịp tim, cần theo dõi thêm. Xem thêm...',
                suggestion: ''
            });
        }

        if (data.bodyTemperature < 38) {
            healthIssues.push({
                warning: 'Nhiệt độ cơ thể thấp, cần giữ ấm. Xem thêm...',
                suggestion: ''
            });
        }

        if (data.bodyTemperature > 39.2) {
            healthIssues.push({
                warning: 'Nhiệt độ cơ thể cao, có thể cần làm mát. Xem thêm...',
                suggestion: ''
            });
        }

        if (data.humidity < 40) {
            healthIssues.push({
                warning: 'Độ ẩm cơ thể thấp, cần tăng độ ẩm môi trường. Xem thêm...',
                suggestion: ''
            });
        }

        if (data.humidity > 60) {
            healthIssues.push({
                warning: 'Độ ẩm môi trường, cần giảm độ ẩm môi trường. Xem thêm...',
                suggestion: ''
            });
        }
    }
    return healthIssues.length > 0 ? healthIssues : [{ warning: 'Thú cưng khỏe mạnh.', suggestion: '' }];
}

module.exports = { analyzePetHealth };
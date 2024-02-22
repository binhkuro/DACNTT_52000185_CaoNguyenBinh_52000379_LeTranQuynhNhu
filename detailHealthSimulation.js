// Thông tin sức khỏe được dự đoán nhờ chỉ số cảm biến sức khỏe thú cưng
function analyzePetHealth(data, type) {
    let healthIssues = [];
    if (type === "Chó") {
        if (data.heartRate < 60) {
            healthIssues.push({
                warning: 'Có vấn đề với nhịp tim, cần theo dõi thêm.',
                suggestion: 'Đề xuất.'
            });
        }

        if (data.heartRate > 120) {
            healthIssues.push({
                warning: 'Có vấn đề với nhịp tim, cần theo dõi thêm.',
                suggestion: 'Đề xuất.'
            });
        }

        if (data.bodyTemperature < 38.3) {
            healthIssues.push({
                warning: 'Nhiệt độ cơ thể thấp, cần giữ ấm.',
                suggestion: 'Đề xuất.'
            });
        }

        if (data.bodyTemperature > 39.2) {
            healthIssues.push({
                warning: 'Nhiệt độ cơ thể cao, có thể cần làm mát.',
                suggestion: 'Đề xuất.'
            });
        }

        if (data.humidity < 40) {
            healthIssues.push({
                warning: 'Độ ẩm cơ thể thấp, cần tăng độ ẩm môi trường.',
                suggestion: 'Đề xuất.'
            });
        }

        if (data.humidity > 60) {
            healthIssues.push({
                warning: 'Độ ẩm môi trường, cần giảm độ ẩm môi trường.',
                suggestion: 'Đề xuất.'
            });
        }
    }

    if (type === "Mèo") {
        if (data.heartRate < 140) {
            healthIssues.push({
                warning: 'Có vấn đề với nhịp tim, cần theo dõi thêm.',
                suggestion: 'Đề xuất.'
            });
        }

        if (data.heartRate > 220) {
            healthIssues.push({
                warning: 'Có vấn đề với nhịp tim, cần theo dõi thêm.',
                suggestion: 'Đề xuất.'
            });
        }

        if (data.bodyTemperature < 38) {
            healthIssues.push({
                warning: 'Nhiệt độ cơ thể thấp, cần giữ ấm.',
                suggestion: 'Đề xuất.'
            });
        }

        if (data.bodyTemperature > 39.2) {
            healthIssues.push({
                warning: 'Nhiệt độ cơ thể cao, có thể cần làm mát.',
                suggestion: 'Đề xuất.'
            });
        }

        if (data.humidity < 40) {
            healthIssues.push({
                warning: 'Độ ẩm cơ thể thấp, cần tăng độ ẩm môi trường.',
                suggestion: 'Đề xuất.'
            });
        }

        if (data.humidity > 60) {
            healthIssues.push({
                warning: 'Độ ẩm môi trường, cần giảm độ ẩm môi trường.',
                suggestion: 'Đề xuất.'
            });
        }
    }
    return healthIssues.length > 0 ? healthIssues : [{ warning: 'Thú cưng khỏe mạnh.', suggestion: '' }];
}

module.exports = { analyzePetHealth };
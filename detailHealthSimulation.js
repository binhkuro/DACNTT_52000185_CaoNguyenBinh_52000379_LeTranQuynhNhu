// Thông tin sức khỏe được dự đoán nhờ chỉ số cảm biến sức khỏe thú cưng
function analyzePetHealth(data, type) {
    let healthIssues = [];
    if (type === "Chó") {
        if (data.heartRate < 60) {
            healthIssues.push({
                warning: 'Nhịp tim của chó thấp, cần theo dõi thêm. Xem thêm...',
                suggestion: ''
            });
        }

        if (data.heartRate > 120) {
            healthIssues.push({
                warning: 'Nhịp tim của chó cao, cần theo dõi thêm. Xem thêm...',
                suggestion: ''
            });
        }

        if (data.bodyTemperature < 37.4) {
            healthIssues.push({
                warning: 'Nhiệt độ cơ thể của chó thấp, cần giữ ấm. Xem thêm...',
                suggestion: ''
            });
        }

        if (data.bodyTemperature > 39.3) {
            healthIssues.push({
                warning: 'Nhiệt độ cơ thể của chó cao, có thể cần làm mát. Xem thêm...',
                suggestion: ''
            });
        }

        if (data.humidity < 40) {
            healthIssues.push({
                warning: 'Độ ẩm cơ thể của chó thấp, cần tăng độ ẩm môi trường. Xem thêm...',
                suggestion: ''
            });
        }

        if (data.humidity > 60) {
            healthIssues.push({
                warning: 'Độ ẩm cơ thể của chó cao, cần giảm độ ẩm môi trường. Xem thêm...',
                suggestion: ''
            });
        }
    }

    if (type === "Mèo") {
        if (data.heartRate < 140) {
            healthIssues.push({
                warning: 'Nhịp tim của mèo thấp, cần theo dõi thêm. Xem thêm...',
                suggestion: ''
            });
        }

        if (data.heartRate > 220) {
            healthIssues.push({
                warning: 'Nhịp tim của mèo cao, cần theo dõi thêm. Xem thêm...',
                suggestion: ''
            });
        }

        if (data.bodyTemperature < 38) {
            healthIssues.push({
                warning: 'Nhiệt độ cơ thể của mèo thấp, cần giữ ấm. Xem thêm...',
                suggestion: ''
            });
        }

        if (data.bodyTemperature > 39.2) {
            healthIssues.push({
                warning: 'Nhiệt độ cơ thể của mèo cao, có thể cần làm mát. Xem thêm...',
                suggestion: ''
            });
        }

        if (data.humidity < 40) {
            healthIssues.push({
                warning: 'Độ ẩm cơ thể của mèo thấp, cần tăng độ ẩm môi trường. Xem thêm...',
                suggestion: ''
            });
        }

        if (data.humidity > 60) {
            healthIssues.push({
                warning: 'Độ ẩm cơ thể của mèo cao, cần giảm độ ẩm môi trường. Xem thêm...',
                suggestion: ''
            });
        }
    }
    return healthIssues.length > 0 ? healthIssues : [{ warning: 'Thú cưng khỏe mạnh.', suggestion: '' }];
}

module.exports = { analyzePetHealth };
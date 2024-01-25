let randomEnvironment = {
    temperature: 0,
    humidity: 0
};

function generateEnvironmentData() {
    randomEnvironment.temperature = Math.random() * 35 + 10; // Tạo nhiệt độ ngẫu nhiên trong khoảng từ 10 đến 45 độ C
    randomEnvironment.humidity = Math.random() * 60 + 30; // Tạo độ ẩm ngẫu nhiên trong khoảng từ 30% đến 90%
}

function getEnvironmentData() {
    return randomEnvironment;
}

module.exports = { generateEnvironmentData, getEnvironmentData };
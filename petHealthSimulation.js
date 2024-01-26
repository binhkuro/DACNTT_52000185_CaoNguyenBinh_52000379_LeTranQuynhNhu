let petHealthData = {
    activity: 0,
    heartRate: 0,
    bodyTemperature: 0,
    humidity: 0
};

function generatePetHealthData() {
    petHealthData.activity = Math.random() * 100; // Số bước đi tối đa trong 1 giây (có thể là số thập phân)
    petHealthData.heartRate = Math.random() * (120 - 60) + 60; // Nhịp tim từ 60 đến 120 nhịp/phút (có thể là số thập phân)
    petHealthData.bodyTemperature = Math.random() * (39.2 - 38) + 38; // Nhiệt độ cơ thể từ 38 đến 39.2 độ C
    petHealthData.humidity = Math.random() * (70 - 30) + 30; // Độ ẩm từ 30% đến 70%
}

function getPetHealthData() {
    return petHealthData;
}

module.exports = { generatePetHealthData, getPetHealthData };
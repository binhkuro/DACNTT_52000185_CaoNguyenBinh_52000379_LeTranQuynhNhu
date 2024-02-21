// Giả lập các chỉ số sức khỏe từ vòng cảm biến
let petHealthData = {
    activity: 0,
    heartRate: 0,
    bodyTemperature: 0,
    humidity: 0
};

function generatePetHealthData(type) {
    if (type === 'Chó') {
        petHealthData.activity = Math.random() * 5000;
        petHealthData.heartRate = Math.random() * (130 - 60) + 60;
        petHealthData.bodyTemperature = Math.random() * (40 - 36) + 36;
        petHealthData.humidity = Math.random() * (70 - 30) + 30;
    } else if (type === 'Mèo') {
        petHealthData.activity = Math.random() * 500;
        petHealthData.heartRate = Math.random() * (230 - 110) + 110;
        petHealthData.bodyTemperature = Math.random() * (40 - 37) + 37;
        petHealthData.humidity = Math.random() * (70 - 30) + 30;
    }
}

function getPetHealthData() {
    return petHealthData;
}

module.exports = { generatePetHealthData, getPetHealthData };
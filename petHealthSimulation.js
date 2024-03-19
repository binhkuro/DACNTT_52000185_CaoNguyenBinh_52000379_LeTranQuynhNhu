// Giả lập các chỉ số sức khỏe từ vòng cảm biến
let petHealthData = {
    activity: 0,
    heartRate: 0,
    bodyTemperature: 0,
    humidity: 0
};

function generatePetHealthData(data, type) {
    if (type === 'Chó') {
        petHealthData.activity = Math.random() * 5000;
        if (data.humidity > 60) {
            petHealthData.humidity = Math.random() * (70 - 60) + 60;
        } else if (data.humidity < 40) {
            petHealthData.humidity = Math.random() * (40 - 30) + 40;
        } else {
            petHealthData.humidity = Math.random() * (60 - 40) + 40;
        }
        petHealthData.heartRate = Math.random() * (130 - 50) + 50;
        petHealthData.bodyTemperature = Math.random() * (40 - 36) + 36;
    } else if (type === 'Mèo') {
        petHealthData.activity = Math.random() * 500;
        if (data.humidity > 60) {
            petHealthData.humidity = Math.random() * (70 - 60) + 60;
        } else if (data.humidity < 40) {
            petHealthData.humidity = Math.random() * (40 - 30) + 40;
        } else {
            petHealthData.humidity = Math.random() * (60 - 40) + 40;
        }
        petHealthData.heartRate = Math.random() * (230 - 110) + 110;
        petHealthData.bodyTemperature = Math.random() * (40 - 37) + 37;
    }
}

function getPetHealthData() {
    return petHealthData;
}

module.exports = { generatePetHealthData, getPetHealthData };
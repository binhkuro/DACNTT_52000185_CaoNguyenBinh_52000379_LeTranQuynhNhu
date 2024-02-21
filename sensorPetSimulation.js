// Điều chỉnh chỉ số sức khỏe theo nhiệt độ môi trường

function adjustPetEnvironment(environmentData, petHealth) {
    if (petHealth.type === "Chó") {
        if (environmentData.temperature < 10) {
            petHealth.bodyTemperature -= 0.1;
        } else if (environmentData.temperature > 28) {
            petHealth.bodyTemperature += 0.1;
        } else {
            petHealth.bodyTemperature = petHealth.bodyTemperature;
        }

        if (environmentData.humidity < 40) {
            petHealth.humidity -= 1;
        } else if (environmentData.temperature > 60) {
            petHealth.humidity += 1
        } else {
            petHealth.humidity = petHealth.humidity;
        }

        if (petHealth.activity > 2000) {
            petHealth.heartRate += 1;
        }
    } else if (petHealth.type === "Mèo") {
        if (environmentData.temperature < 10) {
            petHealth.bodyTemperature -= 0.1;
        } else if (environmentData.temperature > 28) {
            petHealth.bodyTemperature += 0.1;
        }

        if (environmentData.humidity < 40) {
            petHealth.humidity -= 1;
        } else if (environmentData.temperature > 60) {
            petHealth.humidity += 1;
        }

        if (petHealth.activity > 300) {
            petHealth.heartRate += 1;
        }
    }
    return petHealth;
}

module.exports = { adjustPetEnvironment };
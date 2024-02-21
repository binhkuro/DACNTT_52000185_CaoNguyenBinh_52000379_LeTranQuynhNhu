// Điều chỉnh chỉ số sức khỏe theo nhiệt độ môi trường

function adjustPetEnvironment(environmentData, petHealth) {
    if (environmentData.temperature < 22) {
        if (petHealth.bodyTemperature < 37) {
            petHealth.bodyTemperature -= 0.1;
        } else if (petHealth.bodyTemperature > 39) {
            petHealth.bodyTemperature -= 0.5;
        } else {
            petHealth.bodyTemperature -= 0.2
        }
    } else if (environmentData.temperature > 24) {
        if (petHealth.bodyTemperature < 37) {
            petHealth.bodyTemperature += 0.5;
        } else if (petHealth.bodyTemperature > 39) {
            petHealth.bodyTemperature += 0.1;
        } else {
            petHealth.bodyTemperature += 0.2
        }
    } else {
        petHealth.bodyTemperature = petHealth.bodyTemperature;
    }

    if (environmentData.humidity < 40) {
        if (petHealth.humidity < 40) {
            petHealth.humidity += 5;
        } else if (petHealth.humidity > 60) {
            petHealth.humidity += 1;
        } else {
            petHealth.humidity += 2
        }
    } else if (environmentData.temperature > 60) {
        if (petHealth.humidity < 40) {
            petHealth.humidity -= 1;
        } else if (petHealth.humidity > 60) {
            petHealth.humidity -= 5;
        } else {
            petHealth.humidity -= 2
        }
    } else {
        petHealth.humidity = petHealth.humidity;
    }

    return petHealth;
}

module.exports = { adjustPetEnvironment };
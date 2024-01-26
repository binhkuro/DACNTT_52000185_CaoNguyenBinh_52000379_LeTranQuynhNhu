function generateActivityData() {
    // Giả sử rằng '100' là số bước đi tối đa mà thú cưng có thể thực hiện trong 1 giây
    return Math.floor(Math.random() * 100);
}

function generateHeartRateData() {
    // Giả sử rằng nhịp tim bình thường của thú cưng là từ 60 đến 120 nhịp/phút
    return Math.floor(Math.random() * (120 - 60 + 1) + 60);
}

function generateBodyTemperatureData() {
    // Nhiệt độ cơ thể bình thường cho chó và mèo là khoảng từ 38 đến 39.2 độ C
    return (Math.random() * (39.2 - 38) + 38).toFixed(2);
}

function generateHumidityData() {
    // Giả sử độ ẩm lý tưởng cho lông và da của thú cưng là từ 30% đến 70%
    return Math.floor(Math.random() * (70 - 30 + 1) + 30);
}

module.exports = {
    generateActivityData,
    generateHeartRateData,
    generateBodyTemperatureData,
    generateHumidityData
};
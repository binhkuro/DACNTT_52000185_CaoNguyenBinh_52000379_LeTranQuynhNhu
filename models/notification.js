let mongoose = require("mongoose");

mongoose.Promise = global.Promise; // làm cho promise của mongo sẽ giống với promise của nodejs
let Schema = mongoose.Schema;

// Khai báo các thuộc tính cho model
let notificationSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    event: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});

let Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification
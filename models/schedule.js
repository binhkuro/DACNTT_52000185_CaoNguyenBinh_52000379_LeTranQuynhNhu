let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let scheduleSchema = new Schema({
    scheduleId: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    activity: {
        type: String,
        required: true
    },
    purpose: String,
    contact: String,
    note: String,
    result: String,
    createdTime: String,
    updatedTime: String,
    username: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

let Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;
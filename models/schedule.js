let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let scheduleSchema = new Schema({
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
    username: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

let Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;
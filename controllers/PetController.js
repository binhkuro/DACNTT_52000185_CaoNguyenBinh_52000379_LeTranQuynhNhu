let Schedule = require("../models/schedule");

function formatDate(inputDate) {
    const parts = inputDate.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function getMedicalPage(req, res) {
    res.render('medical', {
        title: 'Lịch trình y tế',
        username: req.session.username,
        fullname: req.session.fullname,
        profilePicture: req.session.profilePicture,
    });
}

async function getSchedulePage(req, res) {
    const schedules = await Schedule.find({}).lean(); 

    res.render('schedule', {
        title: 'Ghi lịch trình y tế',
        username: req.session.username,
        fullname: req.session.fullname,
        profilePicture: req.session.profilePicture,
        schedules: schedules
    });
}

function getHealthPage(req, res) {
    res.render('health', {
        title: 'Sức Khỏe',
        username: req.session.username,
        fullname: req.session.fullname,
        profilePicture: req.session.profilePicture,
    });
}

async function addSchedule(req, res) {
    formatedTime = formatDate(req.body.time);

    let schedule = new Schedule({
        time: formatedTime,
        activity: req.body.activity,
        purpose: req.body.purpose,
        contact: req.body.contact,
        note: req.body.note,
        result: req.body.result,
        username: req.session.username
    });

    try {
        await schedule.save();
        req.flash("success", "Lịch trình mới đã được thêm vào hệ thống");
        res.redirect("/schedule");
    } catch (error) {
        req.flash("error", "Không thể lưu lịch trình vào hệ thống");
        res.redirect("/schedule");
    }
}
module.exports = {
    getMedicalPage,
    getSchedulePage,
    getHealthPage,
    addSchedule,
};
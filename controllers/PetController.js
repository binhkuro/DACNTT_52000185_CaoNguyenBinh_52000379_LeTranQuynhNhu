let Pet = require("../models/pet");
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
    const schedules = await Schedule.find({ username: req.session.username }).lean(); 

    res.render('schedule', {
        title: 'Ghi lịch trình y tế',
        username: req.session.username,
        fullname: req.session.fullname,
        profilePicture: req.session.profilePicture,
        schedules: schedules
    });
}

async function getHealthPage(req, res) {
    const pets = await Pet.find({ username: req.session.username }).lean(); 

    res.render('health', {
        title: 'Sức Khỏe',
        username: req.session.username,
        fullname: req.session.fullname,
        profilePicture: req.session.profilePicture,
        pets: pets
    });
}

async function addPet(req, res) {
    if (req.body.name === "" || req.body.age === "" || req.body.type === "" || req.body.species === "" || req.body.gender === "" || req.body.color === "" || req.body.special === "") {
        req.flash("error", "Vui lòng không bỏ trống thông tin");
        return res.redirect("/health");
    }

    let pet = new Pet({
        name: req.body.name,
        age: req.body.age,
        type: req.body.type,
        species: req.body.species,
        gender: req.body.gender,
        color: req.body.color,
        special: req.body.special,
        username: req.session.username
    });

    try {
        await pet.save();
        req.flash("success", "Thú cưng của bạn đã được thêm vào hệ thống");
        res.redirect("/health");
    } catch (error) {
        req.flash("error", "Vui lòng đăng nhập để tiếp tục");
        res.redirect("/health");
    }
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
        req.flash("error", "Vui lòng đăng nhập để tiếp tục");
        res.redirect("/schedule");
    }
}

module.exports = {
    getMedicalPage,
    getSchedulePage,
    getHealthPage,
    addPet,
    addSchedule,
};
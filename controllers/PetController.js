let Pet = require("../models/pet");
let Schedule = require("../models/schedule");
let Notification = require("../models/notification")

function formatDate(inputDate) {
    const parts = inputDate.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

async function getMedicalPage(req, res) {
    const notifications = await Notification.find({ username: req.session.username }).lean();

    res.render('medical', {
        title: 'Lịch trình y tế',
        username: req.session.username,
        fullname: req.session.fullname,
        profilePicture: req.session.profilePicture,
        notifications: notifications,
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
        req.flash("error", "Không thêm được thú cưng");
        res.redirect("/health");
    }
}

async function addSchedule(req, res) {
    if (req.body.time === "" || req.body.activity === "" || req.body.purpose === "" || req.body.contact === "" || req.body.note === "" || req.body.result === "") {
        req.flash("error", "Vui lòng không bỏ trống thông tin");
        return res.redirect("/schedule");
    }

    let schedule = new Schedule({
        time: formatDate(req.body.time),
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
        req.flash("error", "Không thể thêm mới lịch trình");
        res.redirect("/schedule");
    }
}

async function addNotification(req, res) {
    if (req.body.date === "" || req.body.event === "") {
        req.flash("error", "Vui lòng không bỏ trống thông tin");
        return res.redirect("/medical");
    }

    let currentDate = new Date();
    let generateId = `${currentDate.getDate().toString().padStart(2, '0')}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getFullYear()}${currentDate.getHours().toString().padStart(2, '0')}${currentDate.getMinutes().toString().padStart(2, '0')}${currentDate.getSeconds().toString().padStart(2, '0')}`;

    let newNotification = new Notification({
        notificationId: generateId,
        date: formatDate(req.body.date),
        event: req.body.event,
        username: req.session.username
    });

    try {
        await newNotification.save();
        req.flash("success", "Nhắc nhở đã được thêm vào hệ thống");
        res.redirect('/medical');
    } catch (error) {
        req.flash("error", "Không thể thêm nhắc nhở vào hệ thống");
        res.redirect('/medical');
    }
}

async function removeNotification(req, res) {
    try {
        let id = req.body.notificationId;
        const deletedNotification = await Notification.findOneAndDelete({ notificationId: id });
        if (deletedNotification) {
            req.flash("success", "Xoá nhắc nhở thành công");
            res.redirect('/medical');
        } else {
            req.flash("error", "Không thể xóa nhắc nhở. Nhắc nhở không tồn tại.");
            res.redirect('/medical');
        }
    } catch (error) {
        req.flash("error", "Xóa nhắc nhở thất bại");
        res.redirect('/medical');
    }
}

module.exports = {
    getMedicalPage,
    getSchedulePage,
    getHealthPage,
    addPet,
    addSchedule,
    addNotification,
    removeNotification,
};
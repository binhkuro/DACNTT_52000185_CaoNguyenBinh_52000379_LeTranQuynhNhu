let Account = require("../models/account");
let Pet = require("../models/pet");
let Notification = require("../models/notification");
let Schedule = require("../models/schedule");
let mailController = require('./MailController')

async function getUserPetData() {
    let userPetData = {
        "Không Thú Cưng": 0,
        "Chỉ Nuôi Chó": 0,
        "Chỉ Nuôi Mèo": 0,
        "Nuôi Cả Hai": 0
    };

    let accounts = await Account.find();
    for (let account of accounts) {
        let pets = await Pet.find({ username: account.username });
        if (pets.length === 0) {
            userPetData["Không Thú Cưng"]++;
        } else {
            let hasDog = pets.some(pet => pet.type === "Chó");
            let hasCat = pets.some(pet => pet.type === "Mèo");
            if (hasDog && hasCat) {
                userPetData["Nuôi Cả Hai"]++;
            } else if (hasDog) {
                userPetData["Chỉ Nuôi Chó"]++;
            } else if (hasCat) {
                userPetData["Chỉ Nuôi Mèo"]++;
            }
        }
    }
    return userPetData;
}

async function getAdminHomePage(req, res) {
    const accountCount = await Account.countDocuments().exec();
    const petCount = await Pet.countDocuments().exec();
    const dogCount = await Pet.countDocuments({ type: 'Chó' }).exec();
    const catCount = await Pet.countDocuments({ type: 'Mèo' }).exec();
    const notificationCount = await Notification.countDocuments().exec();
    const scheduleCount = await Schedule.countDocuments().exec();

    const userPetData = await getUserPetData();

    res.render('home-admin', {
        title: 'Trang chủ quản lý',
        username: req.session.username,
        fullname: req.session.fullname,
        profilePicture: req.session.profilePicture,
        accountCount: accountCount,
        petCount: petCount,
        dogCount: dogCount,
        catCount: catCount,
        notificationCount: notificationCount,
        scheduleCount: scheduleCount,
        userPetData: userPetData,
        layout: 'admin',
    });
}

async function getAccountManagementPage(req, res) {
    let accounts = await Account.find({ username: { $ne: "admin" } }).lean().exec();

    res.render('account-management', {
        title: 'Quản lý người dùng',
        username: req.session.username,
        fullname: req.session.fullname,
        profilePicture: req.session.profilePicture,
        accounts: accounts,
        layout: 'admin',
    });
}

async function getPetManagementPage(req, res) {
    let pets = await Pet.find().lean().exec();

    res.render('pet-management', {
        title: 'Quản lý thú cưng',
        username: req.session.username,
        fullname: req.session.fullname,
        profilePicture: req.session.profilePicture,
        pets: pets,
        layout: 'admin',
    });
}

async function getNotificationManagementPage(req, res) {
    let notifications = await Notification.find().lean().exec();

    res.render('notification-management', {
        title: 'Quản lý nhắc nhở',
        username: req.session.username,
        fullname: req.session.fullname,
        profilePicture: req.session.profilePicture,
        notifications: notifications,
        layout: 'admin',
    });
}

async function getScheduleManagementPage(req, res) {
    let schedules = await Schedule.find().lean().exec();

    res.render('schedule-management', {
        title: 'Quản lý lịch trình y tế',
        username: req.session.username,
        fullname: req.session.fullname,
        profilePicture: req.session.profilePicture,
        pets: pets,
        layout: 'admin',
    });
}

async function removeNotification(req, res) {
    try {
        const notificationId = req.body.notificationId;
        const deletedNotification = await Notification.findOneAndDelete({ notificationId: notificationId });
        if (deletedNotification) {
            req.flash("success", "Xóa nhắc nhở thành công");
            res.redirect('/notification-management');
        } else {
            req.flash("error", "Không thể xóa nhắc nhở. Nhắc nhở không tồn tại.");
            res.redirect('/notification-management');
        }
    } catch (error) {
        req.flash("error", "Xóa nhắc nhở thất bại");
        res.redirect('/notification-management');
    }
}

async function removeAccount(req, res) {
    try {
        const username = req.body.username;
        const deletedAccount = await Account.findOneAndDelete({ username: username });
        if (deletedAccount) {
            req.flash("success", "Xóa người dùng thành công");
            res.redirect('/account-management');
        } else {
            req.flash("error", "Không thể xóa người dùng. Người dùng không tồn tại.");
            res.redirect('/account-management');
        }
    } catch (error) {
        req.flash("error", "Xóa người dùng thất bại");
        res.redirect('/account-management');
    }
}

async function removePet(req, res) {
    try {
        const petId = req.body.petId;
        
        console.log(petId);

        const deletedPet = await Pet.findOneAndDelete({ petId: petId });
        if (deletedPet) {
            req.flash("success", "Xóa thú cưng thành công");
            res.redirect('/pet-management');
        } else {
            req.flash("error", "Không thể xóa thú cưng. Thú cưng không tồn tại.");
            res.redirect('/pet-management');
        }
    } catch (error) {
        console.log(error)
        req.flash("error", "Xóa nhắc nhở thất bại");
        res.redirect('/pet-management');
    }
}

function lockUser(req, res) {
    Account.findOne({
            username: req.body.username,
        })
        .then(async account => {
            let updatedField;

            if (account.lockedStatus === 0) {
                updatedField = {
                    $set: {
                        lockedStatus: 1
                    }
                }
            } else {
                updatedField = {
                    $set: {
                        lockedStatus: 0
                    }
                }
            }

            await Account.updateOne({ username: req.body.username }, updatedField, { new: true })
                .then(updatedAccount => {
                    res.end();
                })
        })
}

async function getProfileByUsername(req, res) {
    Account.findOne({
            username: req.params.username,
        })
        .then(account => {
            let options = {
                layout: 'admin',
                title: 'Trang thông tin người dùng',
                username: req.session.username,
                fullname: req.session.fullname,
                profilePicture: req.session.profilePicture,
                email: account.email,
                username: account.username,
                fullname: account.fullname,
                phoneNumber: account.phoneNumber,
                address: account.address,
                profilePicture: account.profilePicture,
            };

            res.render("profileid", options);
        })
}

async function getPetProfileByPetId(req, res) {
    Pet.findOne({
            petId: req.params.petId,
        })
        .then(pet => {
            let options = {
                layout: 'admin',
                title: 'Trang thông tin thú cưng',
                username: req.session.username,
                fullname: req.session.fullname,
                profilePicture: req.session.profilePicture,
                petId: pet.petId,
                name: pet.name,
                petPicture: pet.petPicture,
                age: pet.age,
                type: pet.type,
                species: pet.species,
                gender: pet.gender,
                color: pet.color,
                special: pet.special,
                petUsername: pet.username,
            };

            res.render("pet-profileid", options)
        })
}

async function sendMail(req, res) {
    let username = req.body.username;
    const account = await Account.findOne({ username: username }).exec();
    let mail = account.email;
    let name = req.body.name;
    let subject = `Sức khỏe của ${name} của bạn đang có vấn đề`;
    let content = `<a href=${process.env.APP_URL}/login> Vui lòng đăng nhập vào để kiểm tra ${name} của bạn</a>`;
    mailController.sendMail(mail, subject, content);
}

module.exports = {
    getAdminHomePage,
    lockUser,
    getProfileByUsername,
    getPetProfileByPetId,
    getAccountManagementPage,
    getPetManagementPage,
    getNotificationManagementPage,
    sendMail,
    removeNotification,
    removeAccount,
    removePet,
};
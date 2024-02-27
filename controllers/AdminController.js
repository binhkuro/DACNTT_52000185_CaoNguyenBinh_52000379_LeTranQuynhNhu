let Account = require("../models/account");
let Pet = require("../models/pet");
let Notification = require("../models/notification");
let Schedule = require("../models/schedule");

async function getAdminHomePage(req, res) {
    const accountCount = await Account.countDocuments().exec();
    const petCount = await Pet.countDocuments().exec();
    const dogCount = await Pet.countDocuments({ type: 'Chó' }).exec();
    const catCount = await Pet.countDocuments({ type: 'Mèo' }).exec();
    const notificationCount = await Notification.countDocuments().exec();
    const scheduleCount = await Schedule.countDocuments().exec();

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

            res.render("profileid", options)
        })
}

module.exports = {
    getAdminHomePage,
    lockUser,
    getProfileByUsername,
    getAccountManagementPage,
    getPetManagementPage,
};
let Account = require("../models/account");

async function getAdminHomePage(req, res) {
    let accounts = await Account.find({ username: { $ne: "admin" } }).lean().exec();

    res.render('home-admin', {
        title: 'Trang chủ quản lý',
        username: req.session.username,
        fullname: req.session.fullname,
        profilePicture: req.session.profilePicture,
        accounts: accounts,
        layout: 'admin',
    });
}

function lockUser(req, res) {
    Account.findOne({
        email: req.body.email,
    })
    .then(async account => {
        let updatedField;

        if(account.lockedStatus === 0) {
            updatedField = {
                $set: {
                    lockedStatus: 1
                }
            }
        }
        else {
            updatedField = {
                $set: {
                    lockedStatus: 0
                }
            }
        }

        await Account.updateOne({email: req.body.email}, updatedField, { new: true })
        .then(updatedAccount => {
            res.end();
        })
    })
}

function getProfileByUsername(req, res) {
    Account.findOne({
        username: req.params.username,
    })
    .then(account => {
        let options = {
            layout: "admin",
            email: account.email, 
            username: account.username,
            fullname: account.fullname, 
            phoneNumber: account.phoneNumber,
            address: account.address,
            profilePicture: account.profilePicture, 
            success: req.flash("success"), 
            error: req.flash("error")
        };

        res.render("profileid", options)
    })
}

module.exports = {
    getAdminHomePage,
    lockUser,
    getProfileByUsername,
};
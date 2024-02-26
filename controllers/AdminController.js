let Account = require("../models/account");

async function getAdminHomePage(req, res) {
    let accounts = await Account.find({ username: { $ne: "admin" } }).lean().exec();

    res.render('admin', {
        title: 'Trang chủ quản lý',
        username: req.session.username,
        fullname: req.session.fullname,
        profilePicture: req.session.profilePicture,
        accounts: accounts,
        layout: 'admin',
    });
}

module.exports = {
    getAdminHomePage,
};
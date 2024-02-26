async function getAdminHomePage(req, res) {
    res.render('admin', {
        title: 'Trang chủ quản lý',
        username: req.session.username,
        fullname: req.session.fullname,
        profilePicture: req.session.profilePicture,
        layout: 'admin',
    });
}

module.exports = {
    getAdminHomePage,
};
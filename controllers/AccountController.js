let Account = require("../models/account");
let Notification = require("../models/notification");
let mailController = require('./MailController')
let multiparty = require('multiparty') // upload file
let fsx = require('fs-extra'); // upload file
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Khởi tạo 1 số dữ liệu mẫu để chạy chương trình
async function initData() {
    // Trước khi khởi tạo dữ liệu mẫu thì ta cần xóa các dữ liệu hiện có
    await Account.deleteMany()

    const hashedPasswordAdmin = await bcrypt.hash("A123456789", 10);
    const hashedPasswordUser = await bcrypt.hash("A12345678", 10);

    // Tài khoản admin
    let account = new Account({
        email: "admin@gmail.com",
        username: "admin",
        password: hashedPasswordAdmin,
        fullname: "Administrator",
        phoneNumber: "0942563747",
        address: "142, Thống Nhất, khóm 01, phường 05, thành phố Bạc Liêu",
        profilePicture: "admin.png",
        activateStatus: 1,
        lockedStatus: 0
    });

    await account.save()

    const hashedPasswordUser1 = await bcrypt.hash("A12345678", 10);
    let account1 = new Account({
        email: "caonguyenbinh12@gmail.com",
        username: "cnbinhblvn",
        password: hashedPasswordUser1,
        fullname: "Cao Nguyên Bình",
        phoneNumber: "0942563747",
        address: "142, Thống Nhất, khóm 01, phường 05, thành phố Bạc Liêu, tỉnh Bạc Liêu",
        profilePicture: "cnbinhblvn.jpg",
        activateStatus: 1,
        lockedStatus: 0
    });

    await account1.save()

    const hashedPasswordUser2 = await bcrypt.hash("A12345678", 10);
    let account2 = new Account({
        email: "letranquynhnhu1692@gmail.com",
        username: "ltqn1692",
        password: hashedPasswordUser2,
        fullname: "Lê Trần Quỳnh Như",
        phoneNumber: "0853094094",
        address: "160/8A, chợ Láng Tròn, Thị Xã Giá Rai, tỉnh Bạc Liêu",
        profilePicture: "ltqn1692.jpg",
        activateStatus: 1,
        lockedStatus: 0
    });

    await account2.save()

    const hashedPasswordUser3 = await bcrypt.hash("A12345678", 10);
    let account3 = new Account({
        email: "binhcaonguyen12@gmail.com",
        username: "soulknight",
        password: hashedPasswordUser3,
        fullname: "Trần Gia Kỳ",
        phoneNumber: "0909778472",
        address: "145, Phạm Ngũ Lão, quận 5, thành phố Hồ Chí Minh",
        profilePicture: "soulknight.jpg",
        activateStatus: 1,
        lockedStatus: 0
    });

    await account3.save()

    let account4 = new Account({
        email: "caobinhnguyen21@gmail.com",
        username: "nguimethucung",
        password: hashedPasswordUser,
        fullname: "Toàn Nhí Nhảnh",
        phoneNumber: "0988778424",
        address: "155, Trần Quốc Toản, phường 8, thành phố Cần Thơ, tỉnh Cần Thơ",
        profilePicture: "nguimethucung.jpg",
        activateStatus: 1,
        lockedStatus: 0
    });

    await account4.save()

    let account5 = new Account({
        email: "swnl6930@gmail.com",
        username: "meolaban",
        password: hashedPasswordUser,
        fullname: "Khiêm Kháu Khỉnh",
        phoneNumber: "0877998776",
        address: "987, Trần Hưng Đạo, phường 12, thành phố Hậu Giang, tỉnh Hậu Giang",
        profilePicture: "meolaban.jpg",
        activateStatus: 1,
        lockedStatus: 1
    });

    await account5.save()

    let account6 = new Account({
        email: "swnl6931@gmail.com",
        username: "kebian6931",
        password: hashedPasswordUser,
        fullname: "Trần Trung Trực",
        phoneNumber: "0634522123",
        address: "543/2A, Lý Thường Kiệt, phường 5, thành phố Bắc Giang, tỉnh Bắc Giang",
        profilePicture: "kebian6931.jpg",
        activateStatus: 1,
        lockedStatus: 0
    });

    await account6.save()

    let account7 = new Account({
        email: "ltqn1692@gmail.com",
        username: "nhuquynhCute",
        password: hashedPasswordUser,
        fullname: "Trần Như Quỳnh",
        phoneNumber: "0704816896",
        address: "125, Lý Công Uẩn, phường 3, thành phố Hải Phòng, tỉnh Hải Phòng",
        profilePicture: "nhuquynhCute.jpg",
        activateStatus: 1,
        lockedStatus: 0
    });

    await account7.save()

    let account8 = new Account({
        email: "letranquynhanh22@gmail.com",
        username: "baobinht2",
        password: hashedPasswordUser,
        fullname: "Anh Lê",
        phoneNumber: "0912345768",
        address: "177, Phạm Ngũ Lão, phường Tân Thọ, thành phố Ninh Bình, tỉnh Ninh Bình",
        profilePicture: "baobinht2.jpg",
        activateStatus: 0,
        lockedStatus: 1
    });

    await account8.save()

    let account9 = new Account({
        email: "immenot123@gmail.com",
        username: "menot123",
        password: hashedPasswordUser,
        fullname: "Nguyễn Tiến Đạt",
        phoneNumber: "0334353660",
        address: "20/6B/1A, Lê Đại Hành, phường 3, thành phố Tiền Giang, tỉnh Tiền Giang",
        profilePicture: "menot123.jpg",
        activateStatus: 0,
        lockedStatus: 1
    });

    await account9.save()

    let account10 = new Account({
        email: "nghiem782002@gmail.com",
        username: "nghiemngayngan",
        password: hashedPasswordUser,
        fullname: "Nguyễn Minh Nghiêm",
        phoneNumber: "0911257832",
        address: "333, Hải Thượng Lãn Ông, phường 4, thành phố An Giang, tỉnh An Giang",
        profilePicture: "nghiemngayngan.jpg",
        activateStatus: 0,
        lockedStatus: 0
    });

    await account10.save()

    let account11 = new Account({
        email: "nghiem7755@gmail.com",
        username: "khacnghiem123",
        password: hashedPasswordUser,
        fullname: "Lê Khắc Nghiêm",
        phoneNumber: "0454777558",
        address: "98/7A, Lê Long Đỉnh, phường Bến Nghế, thành phố Kiên Giang, tỉnh Kiên Giang",
        profilePicture: "khacnghiem123.jpg",
        activateStatus: 1,
        lockedStatus: 1
    });

    await account11.save()

    let account12 = new Account({
        email: "ltri0429@gmail.com",
        username: "ltri0429",
        password: hashedPasswordUser,
        fullname: "Lê Phạm Anh Trí",
        phoneNumber: "0344556210",
        address: "100/10A, Nguyễn Hữu Thọ, phường Tân Phong, thành phố Hà Nội",
        profilePicture: "ltri0429.jpg",
        activateStatus: 1,
        lockedStatus: 0
    });

    await account12.save()

    let account13 = new Account({
        email: "longnhat1982002@gmail.com",
        username: "nhatlongvu",
        password: hashedPasswordUser,
        fullname: "Vũ Nhật Long",
        phoneNumber: "0907614570",
        address: "123, Đường số 1, Quận 1, TP.HCM",
        profilePicture: "nhatlongvu.jpg",
        activateStatus: 1,
        lockedStatus: 1
    });

    await account13.save();

    let account14 = new Account({
        email: "ongtanphat25@gmail.com",
        username: "phatongtan",
        password: hashedPasswordUser,
        fullname: "Ông Tấn Phát",
        phoneNumber: "0942811202",
        address: "456, Đường số 2, Quận 2, TP.HCM",
        profilePicture: "phatongtan.jpg",
        activateStatus: 0,
        lockedStatus: 0
    });

    await account14.save();

    let account15 = new Account({
        email: "ttthinhvip@gmail.com",
        username: "thinhtran",
        password: hashedPasswordUser,
        fullname: "Trần Thanh Thịnh",
        phoneNumber: "0876888822",
        address: "789, Đường số 3, Quận 3, TP.HCM",
        profilePicture: "thinhtran.jpg",
        activateStatus: 1,
        lockedStatus: 0
    });

    await account15.save();

    let account16 = new Account({
        email: "truongthinh252423@gmail.com",
        username: "thinhtruong",
        password: hashedPasswordUser,
        fullname: "Trương Quốc Thịnh",
        phoneNumber: "0233888999",
        address: "101, Đường số 4, Quận 4, TP.HCM",
        profilePicture: "thinhtruong.jpg",
        activateStatus: 0,
        lockedStatus: 1
    });
    await account16.save();
    
    let account17 = new Account({
        email: "ledonghai0404@gmail.com",
        username: "haidongle",
        password: hashedPasswordUser,
        fullname: "Lê Đông Hải",
        phoneNumber: "0544332111",
        address: "202, Đường số 5, Quận 5, TP.HCM",
        profilePicture: "haidongle.jpg",
        activateStatus: 1,
        lockedStatus: 0
    });
    await account17.save();
    
    let account18 = new Account({
        email: "phduong249@gmail.com",
        username: "duongpham",
        password: hashedPasswordUser,
        fullname: "Phạm Hồng Dương",
        phoneNumber: "0238444111",
        address: "303, Đường số 6, Quận 6, TP.HCM",
        profilePicture: "duongpham.jpg",
        activateStatus: 1,
        lockedStatus: 0
    });
    await account18.save();
    
    let account19 = new Account({
        email: "lephamanhtri000@gmail.com",
        username: "trilephan",
        password: hashedPasswordUser,
        fullname: "Lê Phạm Anh Trí",
        phoneNumber: "0922334511",
        address: "404, Đường số 7, Quận 7, TP.HCM",
        profilePicture: "trilephan.jpg",
        activateStatus: 1,
        lockedStatus: 0
    });

    await account19.save();

    let account20 = new Account({
        email: "pp18050406@gmail.com",
        username: "diepchanphong",
        password: hashedPasswordUser,
        fullname: "Diệp Chấn Phong",
        phoneNumber: "0778416279",
        address: "122, Nguyễn Hữu Thọ, phường Tân Hưng, quận 7, thành phố Hồ Chí Minh",
        profilePicture: "diepchanphong.jpg",
        activateStatus: 1,
        lockedStatus: 0
    });

    await account20.save();

    let account21 = new Account({
        email: "caonhatbinhlsgsv@gmail.com",
        username: "nhatbinhmapcutie",
        password: hashedPasswordUser,
        fullname: "Cao Nhật Bình",
        phoneNumber: "0948844848",
        address: "300, Thống Nhất, khóm 2, phường 7, thành phố Bạc Liêu",
        profilePicture: "nhatbinhmapcutie.jpg",
        activateStatus: 1,
        lockedStatus: 0
    });

    await account21.save();
}

async function getHomePage(req, res) {
    const currentBeforeDate = new Date();
    currentBeforeDate.setHours(0, 0, 0, 0);
    const currentDate = new Date();
    let todayStr = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;

    let notifications = await Notification.find({
        username: req.session.username
    }).lean().exec();

    notifications.forEach(notification => {
        notification.dateObj = new Date(notification.date.split('/').reverse().join('-'));
    });

    notifications.sort((a, b) => a.dateObj - b.dateObj);

    let oneLatestNotification = null;
    for (let i = notifications.length - 1; i >= 0; i--) {
        if (notifications[i].dateObj < currentBeforeDate) {
            oneLatestNotification = notifications[i];
            break;
        }
    }
    let latestDate = oneLatestNotification ? oneLatestNotification.date : null;
    let latestNotification = notifications.filter(n => n.date === latestDate);

    let todayNotification = notifications.filter(n => n.date === todayStr);

    let oneUpcomingNotification = notifications.find(n => n.dateObj > currentDate) || null;
    let upcomingDate = oneUpcomingNotification ? oneUpcomingNotification.date : null;
    let upcomingNotification = notifications.filter(n => n.date === upcomingDate);
        
    notifications.forEach(notification => {
        delete notification.dateObj;
    });

    res.render('index', {
        title: 'Trang Chủ',
        username: req.session.username,
        fullname: req.session.fullname,
        profilePicture: req.session.profilePicture,
        notifications: notifications,
        latestNotification,
        upcomingNotification,
        todayNotification
    });
}

function getIntroducePage(req, res) {
    res.render('introduce', {
        title: 'Giới thiệu',
        username: req.session.username,
        fullname: req.session.fullname,
        profilePicture: req.session.profilePicture,
    });
}

// Load user lên trang quản lý
function getAccountManagementPage(req, res) {
    Account.find()
        .lean() // convert Mongoose Object Array thành Javascript Object Array
        .then(accounts => {
            // Lọc ra các account mà không phải là admin
            const accountsNotAdmin = accounts.filter(a => a.username !== "admin");

            res.render('accountManagement', {
                layout: "admin",
                accounts: accountsNotAdmin,
            });
        })
}

// Đăng ký
async function registerAccount(req, res) {
    // Kiểm tra tính hợp lệ của dữ liệu
    if (req.body.email === "" || req.body.username === "" || req.body.fullname === "" || req.body.phoneNumber === "" || req.body.address === "" || req.body.password === "" || req.body.confirmPassword === "") {
        req.flash("error", "Vui lòng không bỏ trống thông tin");
        return res.redirect('/register');
    }

    if (!mailController.isEmail(req.body.email)) {
        req.flash("error", "Email không hợp lệ");
        return res.redirect('/register');
    }

    // Kiểm tra username (ít nhất 5 kí tự, không chứa kí tự đặc biệt)
    if (!/^[A-Za-z0-9]{5,}$/.test(req.body.username)) {
        req.flash("error", "Username phải có ít nhất 5 kí tự và không chứa kí tự đặc biệt");
        return res.redirect('/register');
    }

    // Kiểm tra số điện thoại
    if (!/^\d{10}$/.test(req.body.phoneNumber)) {
        req.flash("error", "Số điện thoại phải gồm 10 chữ số");
        return res.redirect('/register');
    }

    // Kiểm tra mật khẩu
    if (!/(?=.*[A-Z]).{8,16}/.test(req.body.password)) {
        req.flash("error", "Mật khẩu phải dài từ 8 đến 16 ký tự và có ít nhất một chữ cái in hoa");
        return res.redirect('/register');
    }

    if (req.body.password !== req.body.confirmPassword) {
        req.flash("error", "Mật khẩu và xác nhận mật khẩu không khớp");
        return res.redirect('/register');
    }

    if ((await mailController.checkEmailExistence(req.body.email)) === false) {
        req.flash("error", "Địa chỉ email không tồn tại");
        return res.redirect('/register');
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    let account = new Account({
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
        fullname: req.body.fullname,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        profilePicture: "default-avatar.png",
        activateStatus: 0, // tài khoản mới tạo mặc định chưa được activate (tức là chưa click vào đường dẫn trong email)
        lockedStatus: 0 // tài khoản mới tạo mặc định chưa bị khóa
    });

    account.save()
        .then(newAccount => {
            sendEmail(req, res);
            req.flash("success", "Đăng ký tài khoản thành công. Vui lòng kiểm tra email của bạn");
            res.redirect('/register');
        })
        .catch(error => {
            console.log(error)
            req.flash("error", "Email hoặc username này đã tồn tại");
            res.redirect('/register');
        });
}

// Đăng nhập
function loginAccount(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    if (username === "" || password === "") {
        req.flash("error", "Vui lòng không bỏ trống thông tin");
        // Redirect with the token and hashedEmail in the query string if they exist
        return res.redirect('/login' + 
            (req.body.token ? `?token=${encodeURIComponent(req.body.token)}` : '') + 
            (req.body.hashedEmail ? `&hashedEmail=${encodeURIComponent(req.body.hashedEmail)}` : ''));
    }

    Account.findOne({ username: username })
        .then(async account => {
            if (!account) {
                req.flash("error", "Tài khoản hoặc mật khẩu không chính xác");
                // Redirect with the token and hashedEmail in the query string if they exist
                return res.redirect('/login' + 
                    (req.body.token ? `?token=${encodeURIComponent(req.body.token)}` : '') + 
                    (req.body.hashedEmail ? `&hashedEmail=${encodeURIComponent(req.body.hashedEmail)}` : ''));
            }

            const isMatch = await bcrypt.compare(password, account.password);
            if (!isMatch) {
                req.flash("error", "Tài khoản hoặc mật khẩu không chính xác");
                // Redirect with the token and hashedEmail in the query string if they exist
                return res.redirect('/login' + 
                    (req.body.token ? `?token=${encodeURIComponent(req.body.token)}` : '') + 
                    (req.body.hashedEmail ? `&hashedEmail=${encodeURIComponent(req.body.hashedEmail)}` : ''));
            }

            if (account.lockedStatus === 1) {
                req.flash("error", "Tài khoản của bạn đã bị khóa.")
                return res.redirect('login')
            }

            let email = account.email;

            // User chưa kích hoạt tài khoản
            if (account.activateStatus === 0) {
                // Người dùng KHÔNG truy cập trang login thông qua đường link trong email
                if (!req.body.token || !bcrypt.compareSync(email, req.body.hashedEmail)) {
                    req.flash("error", "Vui lòng nhấn vào đường link được gửi đến email của bạn.")
                    return res.redirect('login')
                }

                await Account.updateOne({ email: email }, { $set: { activateStatus: 1 } }, { new: true })

                req.session.username = username;
                req.session.fullname = account.fullname;
                req.session.profilePicture = account.profilePicture;
                return res.redirect("/")
            }

            req.session.username = username;
            req.session.fullname = account.fullname;
            req.session.profilePicture = account.profilePicture;
            if (username === "admin")
                res.redirect("/admin")
            else
                res.redirect("/")
        })
        .catch(error => {
            req.flash("error", "Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại sau.");
            return res.redirect('/login' + 
                (req.body.token ? `?token=${encodeURIComponent(req.body.token)}` : '') + 
                (req.body.hashedEmail ? `&hashedEmail=${encodeURIComponent(req.body.hashedEmail)}` : ''));
        });
}

// Quên mật khẩu
async function forgotPassword(req, res) {
    let username = req.body.username;

    try {
        const user = await Account.findOne({ username: username });

        if (!user) {
            req.flash("error", "Tài khoản không tồn tại");
            return res.render("forgot-password", { error: req.flash("error"), username: username  });
        }

        // Gọi hàm emailForgot để gửi email đổi mật khẩu
        req.body.email = user.email; // Thiết lập email từ dữ liệu người dùng
        emailForgot(req, res); // Gửi email

        // Thông báo cho người dùng kiểm tra email
        req.flash("success", "Vui lòng kiểm tra email của bạn để đổi mật khẩu");
        res.render("forgot-password", { success: req.flash("success"), username: username });

    } catch (error) {
        req.flash("error", "Có lỗi xảy ra, vui lòng thử lại");
        res.render("forgot-password", { error: req.flash("error"), username: username });
    }
}

// Đổi mật khẩu tại header
async function changePassword(req, res) {
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;
    const username = req.session.username; 

    if (!currentPassword || !newPassword || !confirmPassword) {
        req.flash("error", "Vui lòng không bỏ trống thông tin");
        return res.redirect('/change-password1');
    }

    if (!/(?=.*[A-Z]).{8,}/.test(newPassword)) {
        req.flash("error", "Mật khẩu phải dài ít nhất 8 ký tự và có ít nhất một chữ cái in hoa");
        return res.redirect('/change-password1');
    }

    if (newPassword !== confirmPassword) {
        req.flash("error", "Mật khẩu mới và xác nhận mật khẩu không khớp");
        return res.redirect('/change-password1');    
    }

    if (currentPassword === newPassword) {
        req.flash('error', 'Không được nhập trùng mật khẩu hiện tại và mật khẩu mới');
        return res.redirect('/change-password1');
    }

    try {
        const user = await Account.findOne({ username: username });
        if (!user) {
            req.flash("error", "Không tìm thấy tài khoản");
            return res.redirect('/change-password1');
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            req.flash("error", "Mật khẩu hiện tại không chính xác");
            return res.redirect('/change-password1');
        }

        const isOld = await bcrypt.compare(newPassword, user.password);
        if (isOld) {
            req.flash('error', 'Mật khẩu mới không được trùng với mật khẩu hiện tại');
            return res.redirect('/change-password1');
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await Account.updateOne({ username: username }, { password: hashedNewPassword });

        req.flash("success", "Mật khẩu đã được cập nhật thành công. Đang chuyển hướng về trang đăng nhập");
        res.render('password-changed', { message: "Mật khẩu đã được cập nhật thành công. Đang chuyển hướng..." });
    } catch (error) {
        console.error(error);
        req.flash("error", "Có lỗi xảy ra trong quá trình đổi mật khẩu");
        return res.redirect('/change-password1');
    }    
}

function getChangePasswordPage(req, res) {
    res.render('change-password1', {
        title: "Đổi mật khẩu",
        username: req.session.username,
        fullname: req.session.fullname,
        profilePicture: req.session.profilePicture,
    });
}

// Đổi mật khẩu khi quên mật khẩu
async function changePasswordAfterForgot(req, res) {
    let newPassword = req.body.newPassword;
    let confirmPassword = req.body.confirmPassword;
    let token = req.body.token;
    let hashedEmail = req.body.hashedEmail;

    if (!newPassword || !confirmPassword || !token || !hashedEmail) {
        req.flash("error", "Vui lòng không bỏ trống thông tin");
        return res.redirect('/change-password2?token=' + encodeURIComponent(token) + '&hashedEmail=' + encodeURIComponent(hashedEmail));
    }

    if (!/(?=.*[A-Z]).{8,16}/.test(newPassword)) {
        req.flash("error", "Mật khẩu phải dài từ 8 đến 16 ký tự và có ít nhất một chữ cái in hoa");
        return res.redirect('/change-password2?token=' + encodeURIComponent(token) + '&hashedEmail=' + encodeURIComponent(hashedEmail));
    }

    if (newPassword !== confirmPassword) {
        req.flash("error", "Mật khẩu và xác nhận mật khẩu không khớp");
        return res.redirect('/change-password2?token=' + encodeURIComponent(token) + '&hashedEmail=' + encodeURIComponent(hashedEmail));    
    }

    try {
        // Xác thực token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Kiểm tra hash của email
        const isValidHash = bcrypt.compareSync(decoded.email, hashedEmail);
        if (!isValidHash) {
            req.flash("error", "Xác thực không thành công");
            return res.redirect('/change-password2?token=' + encodeURIComponent(token) + '&hashedEmail=' + encodeURIComponent(hashedEmail));
        }

        // Hash mật khẩu mới và cập nhật trong cơ sở dữ liệu
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await Account.findOneAndUpdate({ email: decoded.email }, { password: hashedNewPassword });

        // Thông báo cập nhật thành công và chuyển hướng
        req.flash("success", "Mật khẩu đã được cập nhật thành công. Đang chuyển hướng về trang đăng nhập");
        res.render('password-changed', { message: "Mật khẩu đã được cập nhật thành công. Đang chuyển hướng..." });

    } catch (error) {
        console.error(error);
        req.flash("error", "Có lỗi xảy ra, vui lòng thử lại");
        return res.redirect('/change-password2?token=' + encodeURIComponent(token) + '&hashedEmail=' + encodeURIComponent(hashedEmail));
    }
}

// Đổi mật khẩu tại profile
async function changePasswordInProfile(req, res) {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const username = req.session.username;

    if (!currentPassword || !newPassword || !confirmPassword) {
        req.flash('error', 'Vui lòng điền đầy đủ thông tin');
        return res.redirect('/profile');
    }

    if (!/(?=.*[A-Z]).{8,16}/.test(newPassword)) {
        req.flash("error", "Mật khẩu phải dài từ 8 đến 16 ký tự và có ít nhất một chữ cái in hoa");
        return res.redirect('/profile');
    }

    if (newPassword !== confirmPassword) {
        req.flash('error', 'Mật khẩu mới và mật khẩu xác nhận không khớp');
        return res.redirect('/profile');
    }

    if (currentPassword === newPassword) {
        req.flash('error', 'Không được nhập trùng mật khẩu hiện tại và mật khẩu mới');
        return res.redirect('/profile');
    }

    try {
        const user = await Account.findOne({ username });
        if (!user) {
            req.flash('error', 'Người dùng không tồn tại');
            return res.redirect('/profile');
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            req.flash('error', 'Mật khẩu hiện tại không chính xác');
            return res.redirect('/profile');
        }

        const isOld = await bcrypt.compare(newPassword, user.password);
        if (isOld) {
            req.flash('error', 'Mật khẩu mới không được trùng với mật khẩu hiện tại');
            return res.redirect('/profile');
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await Account.updateOne({ username }, { $set: { password: hashedNewPassword } });

        req.flash("success", "Mật khẩu đã được cập nhật thành công. Đang chuyển hướng về trang đăng nhập");
        res.render('password-changed', { message: "Mật khẩu đã được cập nhật thành công. Đang chuyển hướng..." });
    } catch (error) {
        console.error(error);
        req.flash('error', 'Có lỗi xảy ra khi đổi mật khẩu');
        return res.redirect('/profile');
    }
}

function sendEmail(req, res) {
    let email = req.body.email;
    let subject = "Xác thực tài khoản";

    // Tạo token với thời gian hết hạn là 60 giây
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: 60 });

    // Sử dụng bcrypt để tạo hash của email
    const hashedEmail = bcrypt.hashSync(email, 3);

    // Tạo đường link với token và hash của email
    let content = `<a href="${process.env.APP_URL}/login?token=${token}&hashedEmail=${hashedEmail}"> Vui lòng nhấn vào đây để hoàn tất thủ tục tài khoản</a>`;
    mailController.sendMail(email, subject, content);
}

function emailForgot(req, res) {
    let email = req.body.email;
    let subject = "Xác nhận đổi mật khẩu";

    // Tạo token với thời gian hết hạn là 60 giây
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: 60 });

    // Sử dụng bcrypt để tạo hash của email
    const hashedEmail = bcrypt.hashSync(email, 3);

    // Tạo đường link với token và hash của email
    let content = `<a href="${process.env.APP_URL}/change-password2?token=${token}&hashedEmail=${hashedEmail}"> Vui lòng nhấn vào đây để hoàn tất thủ tục đổi mật khẩu</a>`;
    mailController.sendMail(email, subject, content);	
}

// Load trang profile dựa vào session
function getProfilePage(req, res) {
    Account.findOne({
        username: req.session.username,
    })
    .then(account => {
        let options = {
            email: account.email, 
            username: account.username,
            fullname: account.fullname, 
            password: account.password,
            phoneNumber: account.phoneNumber,
            address: account.address,
            profilePicture: account.profilePicture, 
            success: req.flash("success"), 
            error: req.flash("error")
        };

        res.render("profile", options)
    })
}

// Cập nhật avatar
function changeProfilePicture(req, res) {
    let form = new multiparty.Form()

    form.parse(req, (error, data, files) => {
        if (error) {
            req.flash("error", "Thay đổi ảnh thất bại")
            return res.redirect('profile')
        }
        
        let file = files.file[0];
        
        // Validate file
        if(file.size > 1048576) {
            req.flash("error", "Không chấp nhận ảnh có kích thước lớn hơn 1MB")
            return res.redirect('profile')
        }

        // Đổi tên file là username + extension
        let newFileName = (req.session.username).split("@")[0] + path.extname(file.originalFilename);

        // Lưu file đã được upload vào server
        let tempPath = file.path;
        let savePath = path.join(__dirname, "../public/uploads/avatars/", newFileName);

        fsx.copy(tempPath, savePath, (err) => {
            if (err) {
                req.flash("error", "Thay đổi ảnh thất bại")
                return res.redirect('profile')
            }
        });

        // Cập nhật lại giá trị của profilePicture trong database    
        Account.updateOne({username: req.session.username}, {$set: {profilePicture: newFileName}}, { new: true })
        .then(updatedAccount => {
            if (!updatedAccount) {
                req.flash("error", "Thay đổi ảnh thất bại");
            } else {
                req.session.profilePicture = newFileName;
                req.flash("success", "Thay đổi ảnh thành công");
            }
            res.redirect('profile');
        })
        .catch(error => {
            req.flash("error", "Thay đổi ảnh thất bại")
            res.redirect('profile')
        });
    })
}

// Gỡ ảnh đại diện
function removeProfilePicture(req, res) {
    const username = req.session.username;
    const defaultPicture = "default-avatar.png";

    Account.findOneAndUpdate(
        { username: username },
        { $set: { profilePicture: defaultPicture } },
        { new: true }
    )
    .then(account => {
        if (!account) {
            req.flash('error', 'Không tìm thấy tài khoản');
            return res.redirect('/profile');
        } else {
            req.session.profilePicture = defaultPicture;
            req.flash('success', 'Ảnh đại diện đã được gỡ');
            return res.redirect('/profile');
        }
    })
    .catch(error => {
        console.error(error);
        req.flash('error', 'Có lỗi đã xảy ra');
        return res.redirect('/profile');
    });
}

// Cập nhật tên hiển thị
function updateFullname(req, res) {
    const newFullname = req.body.fullname;
    const username = req.session.username;

    // Kiểm tra tính hợp lệ của dữ liệu
    if (newFullname === "") {
        req.flash("error", "Vui lòng không bỏ trống thông tin");
        return res.redirect('/profile');
    }

    if (!username) {
        req.flash('error', 'Người dùng chưa được xác thực');
        return res.redirect('/profile');
    }

    Account.findOneAndUpdate(
        { username: username },
        { $set: { fullname: newFullname } },
        { new: true }
    )
    .then(account => {
        if (!account) {
            req.flash('error', 'Không tìm thấy tài khoản');
            return res.redirect('/profile');
        } else {
            req.flash('success', 'Cập nhật họ và tên thành công');
            return res.redirect('/profile');
        }
    })
    .catch(error => {
        req.flash('error', 'Có lỗi đã xảy ra');
        return res.redirect('/profile');
    });
}

// Cập nhật địa chỉ
function updateAddress(req, res) {
    const newAddress = req.body.address;
    const username = req.session.username;

    // Kiểm tra tính hợp lệ của dữ liệu
    if (newAddress === "") {
        req.flash("error", "Vui lòng không bỏ trống thông tin");
        return res.redirect('/profile');
    }

    if (!username) {
        req.flash('error', 'Người dùng chưa được xác thực');
        return res.redirect('/profile');
    }

    Account.findOneAndUpdate(
        { username: username },
        { $set: { address: newAddress } },
        { new: true }
    )
    .then(account => {
        if (!account) {
            req.flash('error', 'Không tìm thấy tài khoản');
            return res.redirect('/profile');
        } else {
            req.flash('success', 'Cập nhật địa chỉ thành công');
            return res.redirect('/profile');
        }
    })
    .catch(error => {
        req.flash('error', 'Có lỗi đã xảy ra');
        return res.redirect('/profile');
    });
}

// Cập nhật số điện thoại
function updatePhoneNumber(req, res) {
    const newPhoneNumber = req.body.phoneNumber;
    const username = req.session.username;

    // Kiểm tra tính hợp lệ của dữ liệu
    if (!/^\d{10}$/.test(newPhoneNumber)) {
        req.flash("error", "Số điện thoại phải gồm 10 chữ số");
        return res.redirect('/profile');
    }

    if (newPhoneNumber === "") {
        req.flash("error", "Vui lòng không bỏ trống thông tin");
        return res.redirect('/profile');
    }

    if (!username) {
        req.flash('error', 'Người dùng chưa được xác thực');
        return res.redirect('/profile');
    }

    Account.findOneAndUpdate(
        { username: username },
        { $set: { phoneNumber: newPhoneNumber } },
        { new: true }
    )
    .then(account => {
        if (!account) {
            req.flash('error', 'Không tìm thấy tài khoản');
            return res.redirect('/profile');
        } else {
            req.flash('success', 'Cập nhật số điện thoại thành công');
            return res.redirect('/profile');
        }
    })
    .catch(error => {
        req.flash('error', 'Có lỗi đã xảy ra');
        return res.redirect('/profile');
    });
}

// Cập nhật tổng quát
function updateProfile(req, res) {
    const newFullname = req.body.fullname;
    const newAddress = req.body.address;
    const newPhoneNumber = req.body.phoneNumber;
    const username = req.session.username;

    // Kiểm tra tính hợp lệ của dữ liệu
    if (!/^\d{10}$/.test(newPhoneNumber)) {
        req.flash("error", "Số điện thoại phải gồm 10 chữ số");
        return res.redirect('/profile');
    }

    if (newFullname === "" || newAddress === "" || newPhoneNumber === "") {
        req.flash("error", "Vui lòng không bỏ trống thông tin");
        return res.redirect('/profile');
    }

    if (!username) {
        req.flash('error', 'Người dùng chưa được xác thực');
        return res.redirect('/profile');
    }

    Account.findOneAndUpdate(
        { username: username },
        { $set: {
            fullname : newFullname, 
            address: newAddress,
            phoneNumber: newPhoneNumber, 
        }},
        { new: true }
    )
    .then(account => {
        if (!account) {
            req.flash('error', 'Không tìm thấy tài khoản');
            return res.redirect('/profile');
        } else {
            req.flash('success', 'Cập nhật thông tin thành công');
            return res.redirect('/profile');
        }
    })
    .catch(error => {
        req.flash('error', 'Có lỗi đã xảy ra');
        return res.redirect('/profile');
    });
}

function lockUser(req, res) {
    Account.findOne({
        username: req.body.username,
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

        await Account.updateOne({username: req.body.username}, updatedField, { new: true })
        .then(updatedAccount => {
            res.end();
        })
    })
}

module.exports = {
    initData,
    getHomePage,
    getIntroducePage,
    getAccountManagementPage,
    getChangePasswordPage,
    registerAccount,
    loginAccount,
    forgotPassword,
    changePassword,
    changePasswordAfterForgot,
    changePasswordInProfile,
    sendEmail,
    emailForgot,
    getProfilePage,
    changeProfilePicture,
    removeProfilePicture,
    updateFullname,
    updateAddress,
    updatePhoneNumber,
    updateProfile,
    lockUser,
};
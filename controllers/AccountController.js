let Account = require("../models/account");
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

    const hashedPasswordAdmin = await bcrypt.hash("A12345678", 10);
    // Tài khoản admin
    let account = new Account({
        email: "admin@gmail.com", 
        username: "admin",
        password: hashedPasswordAdmin,
        fullname: "Administrator",
        phoneNumber: "0942563747",
        address: "142, Thống Nhất, khóm 01, phường 05, thành phố Bạc Liêu",
        profilePicture: "default-avatar.png",
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
        profilePicture: "default-avatar.png",
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
        profilePicture: "default-avatar.png",
        activateStatus: 1,
        lockedStatus: 0
    });

    await account2.save()
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
    if(req.body.email === "" || req.body.username === "" || req.body.fullname === "" || req.body.phoneNumber === "" || req.body.address === "" || req.body.password === "" || req.body.confirmPassword === "") {
        req.flash("error", "Vui lòng không bỏ trống thông tin");
        return res.render("register", {error: req.flash("error"), email: req.body.email, email: req.body.username, fullname: req.body.fullname, phoneNumber: req.body.phoneNumber, address: req.body.address});
    }

    if(!mailController.isEmail(req.body.email)) {
        req.flash("error", "Email không hợp lệ");
        return res.render("register", {error: req.flash("error"), email: req.body.email, email: req.body.username, fullname: req.body.fullname, phoneNumber: req.body.phoneNumber, address: req.body.address});
    }

    // Kiểm tra username (ít nhất 5 kí tự, không chứa kí tự đặc biệt)
    if(!/^[A-Za-z0-9]{5,}$/.test(req.body.username)) {
        req.flash("error", "Username phải có ít nhất 5 kí tự và không chứa kí tự đặc biệt.");
        return res.render("register", {error: req.flash("error"), ...req.body});
    }

    // Kiểm tra số điện thoại
    if(!/^\d{10}$/.test(req.body.phoneNumber)) {
        req.flash("error", "Số điện thoại phải gồm 10 chữ số.");
        return res.render("register", {error: req.flash("error"), email: req.body.email, email: req.body.username, fullname: req.body.fullname, phoneNumber: req.body.phoneNumber, address: req.body.address});
    }

    // Kiểm tra mật khẩu
    if(!/(?=.*[A-Z]).{8,16}/.test(req.body.password)) {
        req.flash("error", "Mật khẩu phải dài từ 8 đến 16 ký tự và có ít nhất một chữ cái in hoa.");
        return res.render("register", {error: req.flash("error"), email: req.body.email, email: req.body.username, fullname: req.body.fullname, phoneNumber: req.body.phoneNumber, address: req.body.address});
    }    
    
    if(req.body.password !== req.body.confirmPassword) {
        req.flash("error", "Mật khẩu và xác nhận mật khẩu không khớp");
        return res.render("register", {error: req.flash("error"), email: req.body.email, email: req.body.username, fullname: req.body.fullname, phoneNumber: req.body.phoneNumber, address: req.body.address});
    }    

    if((await mailController.checkEmailExistence(req.body.email)) === false) {
        req.flash("error", "Địa chỉ email không tồn tại");
        return res.render("register", {error: req.flash("error"), email: req.body.email, email: req.body.username, fullname: req.body.fullname, phoneNumber: req.body.phoneNumber, address: req.body.address});
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
        req.flash("success", "Đăng ký tài khoản thành công. Vui lòng kiểm tra email của bạn.");
        res.render("register", {success: req.flash("success")});
    })
    .catch(error => {
        req.flash("error", "Email hoặc username này đã tồn tại");
        res.render("register", {error: req.flash("error"), email: req.body.email, fullname: req.body.fullname, phoneNumber: req.body.phoneNumber, address: req.body.address});
    });
}

// Đăng nhập
function loginAccount(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    if(username === "" || password === "") {
        req.flash("error", "Vui lòng không bỏ trống thông tin")
        return res.render("login", {error: req.flash("error"), username: username, password: password})
    }

    Account.findOne({username: username})
    .then(async account => {
        if(!account) {
            req.flash("error", "Tài khoản hoặc mật khẩu không chính xác")
            return res.render("login", {error: req.flash("error"), username: username, password: password, token: req.body.token})
        }

        const isMatch = await bcrypt.compare(password, account.password);
        if(!isMatch) {
            req.flash("error", "Tài khoản hoặc mật khẩu không chính xác");
            return res.render("login", {error: req.flash("error"), username: username, password: password, token: req.body.token});
        }

        if(account.lockedStatus === 1) {
            req.flash("error", "Tài khoản của bạn đã bị khóa.")
            return res.render("login", {error: req.flash("error")})
        }

        let email = account.email; 

        // User chưa kích hoạt tài khoản
        if(account.activateStatus === 0) {
            // Người dùng KHÔNG truy cập trang login thông qua đường link trong email
            if(!req.body.token || !bcrypt.compareSync(email, req.body.hashedEmail)) {
                req.flash("error", "Vui lòng nhấn vào đường link được gửi đến email của bạn.")
                return res.render("login", {error: req.flash("error"), username: username})
            }

            await Account.updateOne({email: email}, {$set: {activateStatus: 1}}, { new: true })

            req.session.username = username;
            return res.redirect("/")
        }

        req.session.username = username;
        
        if(username === "admin")
            res.redirect("/account-management")
        else
            res.redirect("/")
    })
    .catch(error => {
        req.flash("error", "Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại sau.")
        res.render("login", {error: req.flash("error"), username: username, password: password})
    });
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

module.exports = {
    initData,
    getAccountManagementPage,
    registerAccount,
    loginAccount,
    sendEmail,
};
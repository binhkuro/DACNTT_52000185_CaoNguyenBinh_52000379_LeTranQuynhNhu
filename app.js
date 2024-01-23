const express = require('express')
const mongoose = require("mongoose"); // giúp tương tác database
require("dotenv").config(); // giúp tương tác file .env
const cookieParser = require('cookie-parser'); // cookie
const hbs = require('express-handlebars')
const session = require('express-session'); // session
const flash = require('connect-flash'); // flash message
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Import các module controller
const accountController = require('./controllers/AccountController')
const petController = require('./controllers/PetController')

// Lấy dữ liệu từ file .env ra
const PORT = process.env.PORT;
const CONNECTION_STRING = process.env.CONNECTION_STRING;
const COOKIE_SIGN = process.env.COOKIE_SIGN;

// Cấu hình các package đã import
let app = express()
app.use(express.static(__dirname + '/public')) // truy cập thư mục public để sử dụng img, css, js,...
app.use(express.json()); // lấy dữ liệu từ request dưới dạng JSON
app.use(express.urlencoded({ extended: true })); // lấy dữ liệu từ request dưới dạng url-encoded
app.use(cookieParser(COOKIE_SIGN)); // cookie
app.use(session({ // session
    secret: COOKIE_SIGN,
    resave: true,
    saveUninitialized: true,
}));
app.use(flash()) // flash message
app.engine('handlebars', hbs.engine({
    defaultLayout: 'main',
    helpers: {
        eq: (value1, value2, options) => {
            return value1 === value2;
        },
        inc: (value) => {
            return parseInt(value) + 1;
        },
    }
}))
app.set('view engine', 'handlebars')

app.use((req, res, next) => {
    res.locals.messages = req.flash();
    next();
});

app.get("/", (req, res) => {
    accountController.getHomePage(req, res);
});

app.get("/forgot-password", (req, res) => {
    res.render('forgot-password', {
        title: 'Quên mật khẩu',
    });
});

app.get("/medical", (req, res) => {
    petController.getMedicalPage(req, res);
});

app.get("/schedule", (req, res) => {
    petController.getSchedulePage(req, res);
});

app.get("/health", (req, res) => {
    petController.getHealthPage(req, res);
});

app.get("/introduce", (req, res) => {
    res.render('introduce', {
        title: 'Giới thiệu',
    });
});

app.get("/register", (req, res) => {
    if (req.session.username) {
        delete req.session.username;
    }

    res.render('register');
})

app.get("/login", (req, res) => {
    if (req.session.username) {
        delete req.session.username;
    }

    const token = req.query.token;
    const hashedEmail = req.query.hashedEmail;

    // Kiểm tra xem token và hashedEmail có được cung cấp hay không
    if (!token || !hashedEmail) {
        return res.render('login'); // Hiển thị trang đăng nhập mà không có dữ liệu liên quan đến token
    }

    // Xác thực token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                // Token đã hết hạn
                return res.render('timeout'); // Hiển thị trang thông báo hết thời gian
            } else {
                // Token không hợp lệ vì lý do khác
                return res.render('404');
            }
        }

        // Kiểm tra sự tương đồng giữa hash của email và hashedEmail từ đường link
        if (!bcrypt.compareSync(decoded.email, hashedEmail)) {
            return res.status(401).send('Xác thực không thành công');
        }

        // Token và xác thực thành công, tiếp tục xử lý đăng nhập
        res.render('login', { token, hashedEmail });
    });
});

app.get("/change-password2", (req, res) => {
    if (req.session.username) {
        delete req.session.username;
    }

    const token = req.query.token;
    const hashedEmail = req.query.hashedEmail;

    // Kiểm tra xem token và hashedEmail có được cung cấp hay không
    if (!token || !hashedEmail) {
        return res.render('index'); // Hiển thị trang chủ
    }

    // Xác thực token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                // Token đã hết hạn
                return res.render('timeout'); // Hiển thị trang thông báo hết thời gian
            } else {
                // Token không hợp lệ vì lý do khác
                return res.render('404');
            }
        }

        // Kiểm tra sự tương đồng giữa hash của email và hashedEmail từ đường link
        if (!bcrypt.compareSync(decoded.email, hashedEmail)) {
            return res.status(401).send('Xác thực không thành công');
        }

        // Token và xác thực thành công, tiếp tục xử lý đổi mật khẩu
        res.render('change-password2', { token, hashedEmail });
    });
});

app.post("/register", (req, res) => {
    accountController.registerAccount(req, res);
})

app.post("/login", (req, res) => {
    accountController.loginAccount(req, res);
})

app.post("/forgot-password", (req, res) => {
    accountController.forgotPassword(req, res);
})

app.post("/change-password1", (req, res) => {
    accountController.changePassword(req, res);
});

app.post("/change-password2", (req, res) => {
    accountController.changePasswordAfterForgot(req, res);
});

app.post("/change-password3", (req, res) => {
    accountController.changePasswordInProfile(req, res);
});

app.post("/send-email", (req, res) => {
    accountController.sendEmail(req, res);
    res.end();
})

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/');
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});

app.get("/change-password1", (req, res) => {
    if (!req.session.username)
        return res.redirect("/login");

    accountController.getChangePasswordPage(req, res);
})

app.get("/profile", (req, res) => {
    if (!req.session.username)
        return res.redirect("/login");

    accountController.getProfilePage(req, res);
})

app.get("/profileid/:username", (req, res) => {
    if (!req.session.username)
        return res.redirect("/login");

    accountController.getProfileByUsername(req, res);
})

app.post("/profile", (req, res) => {
    accountController.changeProfilePicture(req, res);
})

app.post("/update-fullname", (req, res) => {
    accountController.updateFullname(req, res);
})

app.post("/update-address", (req, res) => {
    accountController.updateAddress(req, res);
})

app.post("/update-phoneNumber", (req, res) => {
    accountController.updatePhoneNumber(req, res);
})

app.post("/update-profile", (req, res) => {
    accountController.updateProfile(req, res);
});

app.post("/email-forgot", (req, res) => {
    accountController.emailForgot(req, res);
    res.end();
})

app.post("/schedule", (req, res) => {
    petController.addSchedule(req, res);
})

// Middle ware 404 error
app.use((req, res) => {
    res.status(404)
    res.render('404', { layout: null })
})

// Middle ware 500 error
app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500)
    res.render('500', { layout: null })
})

// Kết nối tới database ()
mongoose.connect(CONNECTION_STRING)
    .then(() => {
        accountController.initData();
        console.log('Đã kết nối cơ sở dữ liệu');
        app.listen(PORT); // Tạo server trên cổng 8080 hoặc PORT từ .env
    })
    .catch((error) => {
        console.log('Kết nối cơ sở dữ liệu thất bại', error);
    });
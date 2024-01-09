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
    }
}))
app.set('view engine', 'handlebars')

app.get("/", (req, res) => {
    res.render('index', {
        title: 'Trang Chủ',
    });
});

app.get("/forgot-password", (req, res) => {
    res.render('forgot-password', {
        title: 'Quên mật khẩu',
    });
});

app.get("/medical", (req, res) => {
    res.render('medical', {
        title: 'Lịch trình y tế',
    });
});

app.get("/schedule", (req, res) => {
    res.render('schedule', {
        title: 'Ghi lịch trình y tế',
    });
});

app.get("/add-schedule", (req, res) => {
    res.render('add-schedule', {
        title: 'Thêm lịch trình y tế',
    });
});

app.get("/reminder", (req, res) => {
    res.render('reminder', {
        title: 'Tạo nhắc nhở',
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

app.post('/add-schedule', function(req, res) {
    res.json({ success: true });
});

app.post("/register", (req, res) => {
    accountController.registerAccount(req, res);
})

app.post("/login", (req, res) => {
    accountController.loginAccount(req, res);
})

app.post("/send-email", (req, res) => {
    accountController.sendEmail(req, res);
    res.end();
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
        console.log('Database connected');
        app.listen(PORT); // Tạo server trên cổng 8080 hoặc PORT từ .env
    })
    .catch((error) => {
        console.log('Error connecting to database', error);
    });
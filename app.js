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

app.get("/login", (req, res) => {
    res.render('login', {
        title: 'Đăng nhập',
    });
});

app.get("/register", (req, res) => {
    if (req.session.email) {
        delete req.session.email;
    }

    res.render('register');
})

app.post("/register", (req, res) => {
    accountController.addAccount(req, res);
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

console.log('Database connected');
app.listen(PORT);
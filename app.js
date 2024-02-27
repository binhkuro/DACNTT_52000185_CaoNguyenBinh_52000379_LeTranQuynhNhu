const express = require('express')
const mongoose = require("mongoose"); // giúp tương tác database
require("dotenv").config(); // giúp tương tác file .env
const cookieParser = require('cookie-parser'); // cookie
const hbs = require('express-handlebars')
const session = require('express-session'); // session
const flash = require('connect-flash'); // flash message
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const http = require('http');
const socketIo = require('socket.io');
const { generateEnvironmentData, getEnvironmentData } = require('./environmentSimulation');
const { adjustSensorData } = require('./sensorSimulation');
const { simulateDevices } = require('./deviceSimulation');
const { generatePetHealthData, getPetHealthData } = require('./petHealthSimulation');
const { adjustPetEnvironment } = require('./sensorPetSimulation');
const { analyzePetHealth } = require('./detailHealthSimulation');
const Pet = require('./models/pet.js');

// Import các module controller
const accountController = require('./controllers/AccountController')
const adminController = require('./controllers/AdminController')
const petController = require('./controllers/PetController')

// Lấy dữ liệu từ file .env ra
const PORT = process.env.PORT || 3000;
const CONNECTION_STRING = process.env.CONNECTION_STRING;
const COOKIE_SIGN = process.env.COOKIE_SIGN;

// Cấu hình các package đã import
let app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(COOKIE_SIGN));
app.use(session({
    secret: COOKIE_SIGN,
    resave: true,
    saveUninitialized: true,
}));
app.use(flash());
app.engine('handlebars', hbs.engine({
    defaultLayout: 'main',
    helpers: {
        getLockedStatus: (username, lockedStatus) => {
            if (lockedStatus - 0 === 1)
                return `
                <button class="btn btn-danger" onclick="lockUser('${username}')">
                    <i class="fa-solid fa-lock"></i>          
                </button>
            `;

            return `
                    <button class="btn btn-success" onclick="lockUser('${username}')">
                        <i class="fa-solid fa-lock-open"></i>          
                    </button>
                `;
        },

        isActivateAccount: (activateStatus) => {
            if (activateStatus === 0)
                return '<i class="fa-solid fa-circle text-danger"></i>';
            else
                return '<i class="fa-solid fa-circle text-success"></i>';
        },

        isDogOrCat: (type) => {
            if (type == 'Chó')
                return '<img src="img/dog-icon.png" alt="Dog"/>';
            else
                return '<img src="img/cat-icon.png" alt="Dog"/>';
        },

        eq: (value1, value2, options) => value1 === value2,
        inc: (value) => parseInt(value) + 1,
        ifEquals: (value1, value2, options) => (value1 === value2) ? options.fn(this) : options.inverse(this),
        gt: (a, b) => a > b,
    }
}));
app.set('view engine', 'handlebars')

let petType = '';
app.get('/petDetail/:petId', async(req, res) => {
    try {
        const petId = req.params.petId;
        const pet = await Pet.findOne({ petId: petId });
        if (!pet) {
            return res.status(404).send('Thú cưng không tồn tại');
        }

        petType = pet.type; // Lưu trữ dữ liệu type

        generatePetHealthData(petType);
        let petHealth = getPetHealthData();
        let environmentData = getEnvironmentData();

        petHealth = adjustPetEnvironment(environmentData, petHealth, petType);

        res.render('petDetail', {
            pet: pet,
            petHealth: petHealth,
            username: req.session.username,
            profilePicture: req.session.profilePicture,
            fullname: req.session.fullname
        });
    } catch (error) {
        res.status(500).send('Lỗi server');
    }
});

// Khởi tạo server HTTP và Socket.io
const server = http.createServer(app);
const io = socketIo(server);

// Thiết lập kết nối Socket.io
io.on('connection', (socket) => {
    console.log('A user connected');

    // Cập nhật giá trị ngẫu nhiên mỗi phút
    // Dữ liệu môi trường
    generateEnvironmentData();
    setInterval(() => {
        generateEnvironmentData();
    }, 60000);
    // Dữ liệu sức khỏe
    generatePetHealthData(getEnvironmentData(), petType);
    setInterval(() => {
        generatePetHealthData(getEnvironmentData(), petType);
    }, 60000);

    // Cập nhật và gửi dữ liệu cảm biến theo trạng thái thiết bị mỗi giây
    setInterval(() => {
        let environmentData = getEnvironmentData(); // Lấy giá trị môi trường ngẫu nhiên mới
        let deviceStatus = simulateDevices(environmentData); // Xác định trạng thái thiết bị dựa trên environmentData
        let sensorData = adjustSensorData(environmentData, deviceStatus);

        socket.emit('sensorData', sensorData);
        socket.emit('deviceStatus', deviceStatus);
    }, 1000);

    // Cập nhật và gửi dữ liệu cảm biến theo nhiệt độ môi trường mỗi giây
    setInterval(() => {
        let environmentData = getEnvironmentData();
        let petHealthData = getPetHealthData();
        let petHealth = adjustPetEnvironment(environmentData, petHealthData, petType); // Lấy dữ liệu sức khỏe thú cưng mới

        socket.emit('petHealth', petHealth); // Gửi dữ liệu mới
    }, 1000);

    setInterval(() => {
        let petHealth = getPetHealthData();
        let healthWarnings = analyzePetHealth(petHealth, petType);

        socket.emit('note', healthWarnings); // healthWarnings bao gồm cả warning và suggestion
    }, 1000);

});

// Định nghĩa các route
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
    if (!req.session.username)
        return res.redirect("/login");

    petController.getMedicalPage(req, res);
});

app.get("/schedule", (req, res) => {
    if (!req.session.username)
        return res.redirect("/login");

    petController.getSchedulePage(req, res);
});

app.get("/health", (req, res) => {
    if (!req.session.username)
        return res.redirect("/login");

    petController.getHealthPage(req, res);
});

app.get('/petDetail', (req, res) => {
    res.render('petDetail');
});

app.get('/environment', (req, res) => {
    res.render('environment');
});

app.get("/introduce", (req, res) => {
    accountController.getIntroducePage(req, res);
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

app.get("/admin:profileid::username", (req, res) => {
    if (req.session.username !== "admin")
        return res.redirect("/login");

    adminController.getProfileByUsername(req, res);
})

app.post("/profile", (req, res) => {
    accountController.changeProfilePicture(req, res);
})

app.post("/remove-profilePicture", (req, res) => {
    accountController.removeProfilePicture(req, res);
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

app.post("/health", (req, res) => {
    petController.addPet(req, res);
})

app.post("/remove-pet", (req, res) => {
    petController.removePet(req, res);
})

app.post("/schedule", (req, res) => {
    petController.addSchedule(req, res);
})

app.post("/reminder", (req, res) => {
    petController.addNotification(req, res);
})

app.post("/update-reminder", (req, res) => {
    petController.editNotification(req, res);
})

app.post("/remove-notification", (req, res) => {
    petController.removeNotification(req, res);
})

app.get("/admin", (req, res) => {
    if (req.session.username !== "admin")
        return res.redirect("/login");

    adminController.getAdminHomePage(req, res);
})

app.put("/lock-user", (req, res) => {
    accountController.lockUser(req, res);
})

app.get("/account-management", (req, res) => {
    if (req.session.username !== "admin")
        return res.redirect("/login");

    adminController.getAccountManagementPage(req, res);
})

app.get("/pet-management", (req, res) => {
    if (req.session.username !== "admin")
        return res.redirect("/login");

    adminController.getPetManagementPage(req, res);
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

// Kết nối tới MongoDB và khởi động server
mongoose.connect(CONNECTION_STRING)
    .then(() => {
        accountController.initData();
        console.log('Đã kết nối cơ sở dữ liệu');
        server.listen(PORT, () => {
            console.log(`Server đang chạy trên cổng ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Kết nối cơ sở dữ liệu thất bại', error);
    });
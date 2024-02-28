let Pet = require("../models/pet");
let Schedule = require("../models/schedule");
let Notification = require("../models/notification")
let multiparty = require('multiparty') // upload file
let fsx = require('fs-extra'); // upload file
const path = require('path');

function formatDate(inputDate) {
    const parts = inputDate.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

async function getMedicalPage(req, res) {
    const notifications = await Notification.find({ username: req.session.username }).lean();

    res.render('medical', {
        title: 'Lịch trình y tế',
        username: req.session.username,
        fullname: req.session.fullname,
        profilePicture: req.session.profilePicture,
        notifications: notifications,
    });
}

async function getSchedulePage(req, res) {
    const schedules = await Schedule.find({ username: req.session.username }).lean(); 

    res.render('schedule', {
        title: 'Ghi lịch trình y tế',
        username: req.session.username,
        fullname: req.session.fullname,
        profilePicture: req.session.profilePicture,
        schedules: schedules
    });
}

async function getHealthPage(req, res) {
    const { page = 1, limit = 3, type, search } = req.query;

    let query = { username: req.session.username };
    if (type) {
        query.type = type;
    }
    if (search) {
        query.name = { $regex: search, $options: 'i' };
    }

    try {
        const pets = await Pet.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .lean();

        const count = await Pet.countDocuments(query);
        const totalPages = Math.ceil(count / limit);
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }

        const currentPage = parseInt(page);
        const firstPage = currentPage > 2 ? 1 : null;
        const previousPage = currentPage > 1 ? currentPage - 1 : null;
        const nextPage = currentPage < totalPages ? currentPage + 1 : null;
        const finalPage = (totalPages > 2 && currentPage < (totalPages - 1)) ? totalPages : null;

        res.render('health', {
            title: 'Sức Khỏe',
            username: req.session.username,
            fullname: req.session.fullname,
            profilePicture: req.session.profilePicture,
            pets,
            totalPages,
            firstPage,
            currentPage,
            pages,
            previousPage,
            finalPage,
            nextPage,
            type,
            search
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}

async function getPetProfileByPetId(req, res) {
    try {
        const pet = await Pet.findOne({
            petId: req.params.petId,
        });

        // Kiểm tra xem pet có tồn tại không
        if (!pet) {
            req.flash("error", "Thú cưng không tồn tại");
            return res.redirect('/health');
        }

        let options = {
            title: 'Trang thông tin chi tiết của thú cưng',
            username: req.session.username,
            fullname: req.session.fullname,
            profilePicture: req.session.profilePicture,
            petId: pet.petId,
            name: pet.name,
            petPicture: pet.petPicture,
            age: pet.age,
            type: pet.type,
            species: pet.species,
            gender: pet.gender,
            color: pet.color,
            special: pet.special,
        };

        res.render("pet-profile", options);
    } catch (error) {
        console.error(error);
        req.flash("error", "Lỗi khi tải trang thông tin thú cưng");
        res.redirect('/health');
    }
}

async function addPet(req, res) {
    let form = new multiparty.Form();

    form.parse(req, async (error, fields, files) => {
        if (error) {
            req.flash("error", "Lỗi khi tải lên hình ảnh");
            return res.redirect("/health");
        }
        
        // Kiểm tra các trường thông tin cơ bản
        let { name, age, type, species, gender, color, special } = fields;
        if (!name || !age || !type || !species || !gender || !color || !special) {
            req.flash("error", "Vui lòng không bỏ trống thông tin");
            return res.redirect("/health");
        }
        
        // Xử lý file hình ảnh
        if (files.petPicture && files.petPicture.length > 0) {
            let petPictureFile = files.petPicture[0];
            // Tạo đường dẫn lưu trữ
            let destPath = path.join(__dirname, '../public/uploads/pets/' + req.session.username + "/", petPictureFile.originalFilename);
            try {
                // Sao chép file vào đường dẫn mới
                await fsx.copy(petPictureFile.path, destPath);
                
                const currentDate = new Date();
                let generateId = `${currentDate.getDate().toString().padStart(2, '0')}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getFullYear()}${currentDate.getHours().toString().padStart(2, '0')}${currentDate.getMinutes().toString().padStart(2, '0')}${currentDate.getSeconds().toString().padStart(2, '0')}`;
                
                // Lưu trữ thú cưng mới
                let pet = new Pet({
                    petId: generateId,
                    name: name[0],
                    age: age[0],
                    type: type[0],
                    species: species[0],
                    gender: gender[0],
                    color: color[0],
                    special: special[0],
                    username: req.session.username,
                    petPicture: petPictureFile.originalFilename
                });

                await pet.save();
                req.flash("success", "Thú cưng của bạn đã được thêm vào hệ thống");
                res.redirect("/health");
            } catch (fsError) {
                req.flash("error", "Không thể lưu hình ảnh");
                res.redirect("/health");
            }
        } else {
            req.flash("error", "Vui lòng tải lên hình ảnh cho thú cưng");
            return res.redirect("/health");
        }
    });
}

function updatePetProfile(req, res) {
    const id = req.params.petId;
    const petId = req.body.petId;
    const newName = req.body.name;
    const newAge = req.body.age;
    const newType = req.body.type;
    const newSpecies = req.body.species;
    const newGender = req.body.gender;
    const newColor = req.body.color;
    const newSpecial = req.body.special;
    
    if (!newName || !newAge || !newType || !newSpecies || !newGender || !newColor) {
        req.flash("error", "Vui lòng không bỏ trống thông tin cần thiết");
        return res.redirect(`/profile-pet:${id}`);
    }

    Pet.findOneAndUpdate(
        { petId: petId },
        { $set: {
            name: newName,
            age: newAge,
            type: newType,
            species: newSpecies,
            gender: newGender,
            color: newColor,
            special: newSpecial
        }},
        { new: true }
    )
    .then(pet => {
        if (!pet) {
            req.flash('error', 'Không tìm thấy thú cưng');
            return res.redirect(`/profile-pet:${id}`);
        } else {
            req.flash('success', 'Cập nhật thông tin thú cưng thành công');
            return res.redirect(`/profile-pet:${id}`);
        }
    })
    .catch(error => {
        req.flash('error', 'Có lỗi đã xảy ra');
        return res.redirect(`/profile-pet:${id}`);
    });
}

async function removePet(req, res) {
    try {
        const petId = req.body.petId;
        const deletedPet = await Pet.findOneAndDelete({ petId: petId });
        if (deletedPet) {
            req.flash("success", "Xóa thú cưng thành công");
            res.redirect('/health');
        } else {
            req.flash("error", "Không thể xóa thú cưng. Thú cưng không tồn tại.");
            res.redirect('/health');
        }
    } catch (error) {
        req.flash("error", "Xóa thú cưng thất bại");
        res.redirect('/health');
    }
}

async function addSchedule(req, res) {
    if (req.body.time === "" || req.body.activity === "" || req.body.purpose === "" || req.body.contact === "" || req.body.note === "" || req.body.result === "") {
        req.flash("error", "Vui lòng không bỏ trống thông tin");
        return res.redirect("/schedule");
    }

    let schedule = new Schedule({
        time: formatDate(req.body.time),
        activity: req.body.activity,
        purpose: req.body.purpose,
        contact: req.body.contact,
        note: req.body.note,
        result: req.body.result,
        username: req.session.username
    });

    try {
        await schedule.save();
        req.flash("success", "Lịch trình mới đã được thêm vào hệ thống");
        res.redirect("/schedule");
    } catch (error) {
        req.flash("error", "Không thể thêm mới lịch trình");
        res.redirect("/schedule");
    }
}

async function addNotification(req, res) {
    if (req.body.date === "" || req.body.event === "") {
        req.flash("error", "Vui lòng không bỏ trống thông tin");
        return res.redirect("/medical");
    }

    let currentDate = new Date();
    let generateId = `${currentDate.getDate().toString().padStart(2, '0')}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getFullYear()}${currentDate.getHours().toString().padStart(2, '0')}${currentDate.getMinutes().toString().padStart(2, '0')}${currentDate.getSeconds().toString().padStart(2, '0')}`;

    let newNotification = new Notification({
        notificationId: generateId,
        date: formatDate(req.body.date),
        event: req.body.event,
        username: req.session.username
    });

    try {
        await newNotification.save();
        req.flash("success", "Nhắc nhở đã được thêm vào hệ thống");
        res.redirect('/medical');
    } catch (error) {
        req.flash("error", "Không thể thêm nhắc nhở vào hệ thống");
        res.redirect('/medical');
    }
}

async function editNotification(req, res) {
    try {        
        const notificationId = req.body.notificationId;
        const newEvent = req.body.newEvent;

        // Tìm và cập nhật thông báo
        const editedNotification = await Notification.findOneAndUpdate(
            { notificationId: notificationId },
            { event: newEvent },
            { new: true }
        );
        
        if (editedNotification) {
            req.flash("success", "Cập nhật nhắc nhở thành công");
            res.redirect('/medical');
        } else {
            req.flash("error", "Không thể cập nhật nhắc nhở. Nhắc nhở không tồn tại.");
            res.redirect('/medical');
        }
    } catch (error) {
        req.flash("error", "Cập nhật nhắc nhở thất bại");
        res.redirect('/medical');
    }
}

async function removeNotification(req, res) {
    try {
        let id = req.body.notificationId;
        const deletedNotification = await Notification.findOneAndDelete({ notificationId: id });
        if (deletedNotification) {
            req.flash("success", "Xoá nhắc nhở thành công");
            res.redirect('/medical');
        } else {
            req.flash("error", "Không thể xóa nhắc nhở. Nhắc nhở không tồn tại.");
            res.redirect('/medical');
        }
    } catch (error) {
        req.flash("error", "Xóa nhắc nhở thất bại");
        res.redirect('/medical');
    }
}

async function changePetPicture(req, res) {
    let petId = req.params.petId;
    const currentDate = new Date();
    let generateId = `${currentDate.getDate().toString().padStart(2, '0')}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getFullYear()}${currentDate.getHours().toString().padStart(2, '0')}${currentDate.getMinutes().toString().padStart(2, '0')}${currentDate.getSeconds().toString().padStart(2, '0')}`;
    let form = new multiparty.Form()

    form.parse(req, (error, data, files) => {
        if (error) {
            req.flash("error", "Thay đổi ảnh thất bại")
            return res.redirect(`/profile-pet:${petId}`);
        }
        
        let file = files.file[0];
        
        // Validate file
        if(file.size > 1048576) {
            req.flash("error", "Không chấp nhận ảnh có kích thước lớn hơn 1MB")
            return res.redirect(`/profile-pet:${petId}`);
        }

        // Đổi tên file là username + extension
        let newFileName = generateId + path.extname(file.originalFilename);

        // Lưu file đã được upload vào server
        let tempPath = file.path;
        let savePath = path.join(__dirname, "../public/uploads/pets/" + req.session.username + "/", newFileName);

        fsx.copy(tempPath, savePath, (err) => {
            if (err) {
                req.flash("error", "Thay đổi ảnh thất bại")
                return res.redirect(`/profile-pet:${petId}`);
            }
        });

        // Cập nhật lại giá trị của petPicture trong database    
        Pet.updateOne({ petId: petId }, { $set: { petPicture: newFileName }}, { new: true })
        .then(updatedPet => {
            if (!updatedPet) {
                req.flash("error", "Thay đổi ảnh thất bại");
            } else {
                req.session.petPicture = newFileName;
                req.flash("success", "Thay đổi ảnh thành công");
            }
            res.redirect(`/profile-pet:${petId}`);
        })
        .catch(error => {
            req.flash("error", "Thay đổi ảnh thất bại")
            res.redirect(`/profile-pet:${petId}`);
        });
    })
}

module.exports = {
    getMedicalPage,
    getSchedulePage,
    getHealthPage,
    getPetProfileByPetId,
    addPet,
    updatePetProfile,
    removePet,
    addSchedule,
    addNotification,
    editNotification,
    removeNotification,
    changePetPicture,
};
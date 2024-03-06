let Pet = require("../models/pet");
let Schedule = require("../models/schedule");
let Notification = require("../models/notification")
let multiparty = require('multiparty') // upload file
let fsx = require('fs-extra'); // upload file
const path = require('path');

async function initData() {
    // Trước khi khởi tạo dữ liệu mẫu thì ta cần xóa các dữ liệu hiện có
    await Pet.deleteMany()
    await Notification .deleteMany()
    await Schedule .deleteMany()

    let pet1 = new Pet({
        petId: "03032024001901",
        name: "Mun",
        petPicture: "mun-cnbinhblvn.jpg",
        age: 3,
        type: "Mèo",
        species: "Mèo anh lông ngắn",
        gender: "Đực",
        color: "Vàng chấm trắng",
        special: "Đuôi có vằn đen",
        username: "cnbinhblvn"
    });

    await pet1.save()

    let pet2 = new Pet({
        petId: "03032024001902",
        name: "Bông",
        petPicture: "bong-cnbinhblvn.jpg",
        age: 2,
        type: "Chó",
        species: "Corgi",
        gender: "Cái",
        color: "Nâu vàng",
        special: "Rất thân thiện và năng động",
        username: "cnbinhblvn"
    });

    await pet2.save();

    let pet3 = new Pet({
        petId: "03032024001903",
        name: "Lucy",
        petPicture: "lucy-ltqn1692.jpg",
        age: 1,
        type: "Mèo",
        species: "Siamese",
        gender: "Cái",
        color: "Trắng và đen",
        special: "Mắt xanh sáng, rất hiếu động",
        username: "ltqn1692"
    });

    await pet3.save();
    
    let pet4 = new Pet({
        petId: "03032024001904",
        name: "Max",
        petPicture: "max-soulknight.jpg",
        age: 4,
        type: "Chó",
        species: "Labrador",
        gender: "Đực",
        color: "Đen",
        special: "Thân thiện với trẻ em",
        username: "soulknight"
    });

    await pet4.save();

    let pet5 = new Pet({
        petId: "03032024001905",
        name: "Luna",
        petPicture: "luna-nguimethucung.jpg",
        age: 2,
        type: "Mèo",
        species: "Mèo tước",
        gender: "Cái",
        color: "Xám",
        special: "Mắt lớn, hiếu động",
        username: "nguimethucung"
    });

    await pet5.save();

    let pet6 = new Pet({
        petId: "03032024001906",
        name: "Charlie",
        petPicture: "charlie-meolaban.jpg",
        age: 3,
        type: "Chó",
        species: "Beagle",
        gender: "Đực",
        color: "Nâu trắng",
        special: "Có khả năng theo dõi tốt",
        username: "meolaban"
    });

    await pet6.save();

    let pet7 = new Pet({
        petId: "03032024001907",
        name: "Sparky",
        petPicture: "sparky-phatongtan.jpg",
        age: 1,
        type: "Chó",
        species: "Pug",
        gender: "Đực",
        color: "Vàng",
        special: "Rất thích chơi với bóng",
        username: "phatongtan"
    });
    
    await pet7.save();
    
    let pet8 = new Pet({
        petId: "03032024001908",
        name: "Molly",
        petPicture: "molly-nhuquynhCute.jpg",
        age: 5,
        type: "Mèo",
        species: "Mèo Ragdoll",
        gender: "Cái",
        color: "Trắng tinh",
        special: "Rất yên tĩnh và dễ gần",
        username: "nhuquynhCute"
    });
    
    await pet8.save();
    
    let pet9 = new Pet({
        petId: "03032024001909",
        name: "Buddy",
        petPicture: "buddy-haidongle.jpg",
        age: 2,
        type: "Chó",
        species: "Golden Retriever",
        gender: "Đực",
        color: "Vàng",
        special: "Rất thân thiện và thông minh",
        username: "haidongle"
    });
    
    await pet9.save();
    
    let pet10 = new Pet({
        petId: "03032024001910",
        name: "Zoe",
        petPicture: "zoe-menot123.jpg",
        age: 3,
        type: "Mèo",
        species: "Mèo Maine Coon",
        gender: "Cái",
        color: "Đen và trắng",
        special: "Có bộ lông dài và mềm",
        username: "menot123"
    });
    
    await pet10.save();

    let pet11 = new Pet({
        petId: "03032024001911",
        name: "Daisy",
        petPicture: "daisy-nguimethucung.jpg",
        age: 2,
        type: "Mèo",
        species: "Mèo Scottish Fold",
        gender: "Cái",
        color: "Kem",
        special: "Tai gập đặc trưng",
        username: "nguimethucung"
    });
    
    await pet11.save();

    let pet12 = new Pet({
        petId: "03032024001912",
        name: "Oscar",
        petPicture: "oscar-kebian6931.jpg",
        age: 4,
        type: "Chó",
        species: "Schnauzer",
        gender: "Đực",
        color: "Xám",
        special: "Râu dài đặc trưng",
        username: "kebian6931"
    });
    
    await pet12.save();

    let pet13 = new Pet({
        petId: "03032024001913",
        name: "Bella",
        petPicture: "bella-nhuquynhCute.jpg",
        age: 3,
        type: "Mèo",
        species: "Mèo Bengal",
        gender: "Cái",
        color: "Vàng với sọc đen",
        special: "Lanh lợi và nhanh nhẹn",
        username: "nhuquynhCute"
    });
    
    await pet13.save();

    let pet14 = new Pet({
        petId: "03032024001914",
        name: "Rex",
        petPicture: "rex-baobinht2.jpg",
        age: 5,
        type: "Chó",
        species: "Doberman",
        gender: "Đực",
        color: "Đen và nâu",
        special: "Rất trung thành và bảo vệ",
        username: "baobinht2"
    });
    
    await pet14.save();

    let pet15 = new Pet({
        petId: "03032024001915",
        name: "Lily",
        petPicture: "lily-menot123.jpg",
        age: 1,
        type: "Mèo",
        species: "Mèo Sphynx",
        gender: "Cái",
        color: "Hồng nhạt",
        special: "Không lông, rất yêu quý con người",
        username: "menot123"
    });
    
    await pet15.save();

    let pet16 = new Pet({
        petId: "03032024001916",
        name: "Coco",
        petPicture: "coco-soulknight.jpg",
        age: 4,
        type: "Mèo",
        species: "Mèo Persia",
        gender: "Cái",
        color: "Trắng muốt",
        special: "Bộ lông dày và mắt xanh",
        username: "soulknight"
    });
    
    await pet16.save();
    
    let pet17 = new Pet({
        petId: "03032024001917",
        name: "Jake",
        petPicture: "jake-cnbinhblvn.jpg",
        age: 6,
        type: "Chó",
        species: "Rottweiler",
        gender: "Đực",
        color: "Đen và nâu",
        special: "Mạnh mẽ và dũng cảm",
        username: "cnbinhblvn"
    });
    
    await pet17.save();
    
    let pet18 = new Pet({
        petId: "03032024001918",
        name: "Angel",
        petPicture: "angel-nguimethucung.jpg",
        age: 2,
        type: "Mèo",
        species: "Mèo Siamese",
        gender: "Cái",
        color: "Cream và đen",
        special: "Rất thích được vuốt ve",
        username: "nguimethucung"
    });
    
    await pet18.save();
    
    let pet19 = new Pet({
        petId: "03032024001919",
        name: "Duke",
        petPicture: "duke-kebian6931.jpg",
        age: 3,
        type: "Chó",
        species: "Husky Siberia",
        gender: "Đực",
        color: "Trắng và xám",
        special: "Mắt xanh và thích chạy nhảy",
        username: "kebian6931"
    });
    
    await pet19.save();
    
    let pet20 = new Pet({
        petId: "03032024001920",
        name: "Ruby",
        petPicture: "ruby-nhuquynhCute.jpg",
        age: 1,
        type: "Mèo",
        species: "Mèo Calico",
        gender: "Cái",
        color: "Vàng, đen và trắng",
        special: "Rất nhanh nhẹn và tò mò",
        username: "nhuquynhCute"
    });
    
    await pet20.save();

    let pet21 = new Pet({
        petId: "03032024001921",
        name: "Oliver",
        petPicture: "oliver-khacnghiem123.jpg",
        age: 2,
        type: "Mèo",
        species: "Mèo Abyssinian",
        gender: "Đực",
        color: "Nâu vàng",
        special: "Hoạt bát và tò mò",
        username: "khacnghiem123"
    });
    
    await pet21.save();
    
    let pet22 = new Pet({
        petId: "03032024001922",
        name: "Sammy",
        petPicture: "sammy-khacnghiem123.jpg",
        age: 3,
        type: "Chó",
        species: "Cocker Spaniel",
        gender: "Đực",
        color: "Vàng cam",
        special: "Thích bơi lội và nghịch nước",
        username: "khacnghiem123"
    });
    
    await pet22.save();
    
    let pet23 = new Pet({
        petId: "03032024001923",
        name: "Ginger",
        petPicture: "ginger-soulknight.jpg",
        age: 4,
        type: "Mèo",
        species: "Mèo Turkish Van",
        gender: "Cái",
        color: "Trắng với đốm vàng",
        special: "Thích nước và bơi lội",
        username: "soulknight"
    });
    
    await pet23.save();
    
    let pet24 = new Pet({
        petId: "03032024001924",
        name: "Daisy",
        petPicture: "daisy-menot123.jpg",
        age: 1,
        type: "Chó",
        species: "Shih Tzu",
        gender: "Cái",
        color: "Trắng và nâu",
        special: "Rất yêu thương chủ nhân",
        username: "menot123"
    });
    
    await pet24.save();
    
    let pet25 = new Pet({
        petId: "03032024001925",
        name: "Loki",
        petPicture: "loki-nhatlongvu.jpg",
        age: 2,
        type: "Mèo",
        species: "Mèo Bengal",
        gender: "Đực",
        color: "Vàng với vằn đen",
        special: "Rất linh hoạt và nhanh nhẹn",
        username: "nhatlongvu"
    });
    
    await pet25.save();

    let pet26 = new Pet({
        petId: "03032024001926",
        name: "Misty",
        petPicture: "misthy-khacnghiem123.jpg",
        age: 2,
        type: "Mèo",
        species: "Mèo Ragdoll",
        gender: "Cái",
        color: "Xanh và trắng",
        special: "Thích ôm và rất êm ái",
        username: "khacnghiem123"
    });
    
    await pet26.save();
    
    let pet27 = new Pet({
        petId: "03032024001927",
        name: "Rocky",
        petPicture: "rocky-nghiemngayngan.jpg",
        age: 5,
        type: "Chó",
        species: "Bulldog",
        gender: "Đực",
        color: "Trắng và đốm nâu",
        special: "Bình tĩnh và thích ngủ",
        username: "nghiemngayngan"
    });
    
    await pet27.save();
    
    let pet28 = new Pet({
        petId: "03032024001928",
        name: "Felix",
        petPicture: "felix-nhuquynhCute.jpg",
        age: 3,
        type: "Mèo",
        species: "Mèo Phốc Hồi",
        gender: "Đực",
        color: "Đen",
        special: "Rất hiếu động và thích khám phá",
        username: "nhuquynhCute"
    });
    
    await pet28.save();
    
    let pet29 = new Pet({
        petId: "03032024001929",
        name: "Baxter",
        petPicture: "baxter-baobinht2.jpg",
        age: 4,
        type: "Chó",
        species: "Border Collie",
        gender: "Đực",
        color: "Đen và trắng",
        special: "Thông minh và rất năng động",
        username: "baobinht2"
    });
    
    await pet29.save();
    
    let pet30 = new Pet({
        petId: "03032024001930",
        name: "Sasha",
        petPicture: "sasha-soulknight.jpg",
        age: 1,
        type: "Mèo",
        species: "Mèo Sphynx",
        gender: "Cái",
        color: "Hồng",
        special: "Rất thân thiện và không sợ lạnh",
        username: "soulknight"
    });
    
    await pet30.save();

    let pet31 = new Pet({
        petId: "03032024001931",
        name: "Simba",
        petPicture: "simba-nhatlongvu.jpg",
        age: 3,
        type: "Mèo",
        species: "Mèo Anh Lông Dài",
        gender: "Đực",
        color: "Cam",
        special: "Rất thích chơi trò bắt chuột",
        username: "nhatlongvu"
    });

    await pet31.save();

    let pet32 = new Pet({
        petId: "03032024001932",
        name: "Hazel",
        petPicture: "hazel-phatongtan.jpg",
        age: 2,
        type: "Mèo",
        species: "Mèo Munchkin",
        gender: "Cái",
        color: "Nâu vàng",
        special: "Có đôi chân ngắn dễ thương",
        username: "phatongtan"
    });

    await pet32.save();

    let pet33 = new Pet({
        petId: "03032024001933",
        name: "Murphy",
        petPicture: "murphy-phatongtan.jpg",
        age: 4,
        type: "Chó",
        species: "Australian Shepherd",
        gender: "Đực",
        color: "Đen vàng và trắng",
        special: "Rất thông minh và trung thành",
        username: "phatongtan"
    });

    await pet33.save();

    let pet34 = new Pet({
        petId: "03032024001934",
        name: "Willow",
        petPicture: "willow-nghiemngayngan.jpg",
        age: 5,
        type: "Mèo",
        species: "Mèo Himalaya",
        gender: "Cái",
        color: "Trắng với các đốm màu",
        special: "Rất yên tĩnh và thích được vuốt ve",
        username: "nghiemngayngan"
    });

    await pet34.save();

    let pet35 = new Pet({
        petId: "03032024001935",
        name: "Toby",
        petPicture: "toby-haidongle.jpg",
        age: 2,
        type: "Chó",
        species: "Poodle",
        gender: "Đực",
        color: "Trắng",
        special: "Rất yêu thích trẻ em và thích chơi đùa",
        username: "haidongle"
    });

    await pet35.save();

    let pet36 = new Pet({
        petId: "03032024001936",
        name: "Milo",
        petPicture: "milo-trilephan.jpg",
        age: 1,
        type: "Mèo",
        species: "Mèo Anh Lông Ngắn",
        gender: "Đực",
        color: "Xám",
        special: "Rất nhanh nhẹn và thích chạy nhảy",
        username: "trilephan"
    });
    
    await pet36.save();

    let pet37 = new Pet({
        petId: "03032024001937",
        name: "Bailey",
        petPicture: "bailey-haidongle.jpg",
        age: 2,
        type: "Chó",
        species: "Cavalier King Charles Spaniel",
        gender: "Cái",
        color: "Nâu, đen và trắng",
        special: "Rất dễ thương và thích gần gũi với con người",
        username: "haidongle"
    });
    
    await pet37.save();

    let pet38 = new Pet({
        petId: "03032024001938",
        name: "Cleo",
        petPicture: "cleo-trilephan.jpg",
        age: 3,
        type: "Mèo",
        species: "Mèo Devon Rex",
        gender: "Cái",
        color: "Xám",
        special: "Có tính cách hiếu động và thích khám phá",
        username: "trilephan"
    });
    
    await pet38.save();

    let pet39 = new Pet({
        petId: "03032024001939",
        name: "Dexter",
        petPicture: "dexter-nhatlongvu.jpg",
        age: 4,
        type: "Chó",
        species: "French Bulldog",
        gender: "Đực",
        color: "Xanh đậm",
        special: "Rất yên tĩnh và thích ngủ",
        username: "nhatlongvu"
    });
    
    await pet39.save();

    let pet41 = new Pet({
        petId: "03032024001941",
        name: "Gizmo",
        petPicture: "gizmo-meolaban.jpg",
        age: 6,
        type: "Mèo",
        species: "Mèo Devon Rex",
        gender: "Đực",
        color: "Xám trắng",
        special: "Có bộ lông ngắn nhưng xoăn đặc trưng, rất thân thiện",
        username: "meolaban"
    });

    await pet41.save();

    let pet43 = new Pet({
        petId: "03032024001943",
        name: "Jasper",
        petPicture: "jasper-diepchanphong.jpg",
        age: 4,
        type: "Mèo",
        species: "Mèo Norwegian Forest",
        gender: "Đực",
        color: "Nâu và trắng",
        special: "Bộ lông dày, thích leo trèo",
        username: "diepchanphong"
    });

    await pet43.save();

    let pet44 = new Pet({
        petId: "03032024001944",
        name: "Zelda",
        petPicture: "zelda-diepchanphong.jpg",
        age: 2,
        type: "Mèo",
        species: "Mèo Siberian",
        gender: "Cái",
        color: "Trắng và xám",
        special: "Rất nhạy bén và thích khám phá",
        username: "diepchanphong"
    });

    await pet44.save();

    let pet45 = new Pet({
        petId: "03032024001945",
        name: "Milo",
        petPicture: "milo-diepchanphong.jpg",
        age: 1,
        type: "Chó",
        species: "French Bulldog",
        gender: "Đực",
        color: "Vàng",
        special: "Thích gặp gỡ người mới và rất dễ thương",
        username: "diepchanphong"
    });

    await pet45.save();

    let pet46 = new Pet({
        petId: "03032024001946",
        name: "Piper",
        petPicture: "piper-meolaban.jpg",
        age: 2,
        type: "Mèo",
        species: "Mèo American Shorthair",
        gender: "Cái",
        color: "Xám vằn đen",
        special: "Rất nhanh nhẹn và thích chơi đùa",
        username: "meolaban"
    });
    
    await pet46.save();
    
    let pet47 = new Pet({
        petId: "03032024001947",
        name: "Frankie",
        petPicture: "frankie-nhatlongvu.jpg",
        age: 3,
        type: "Chó",
        species: "Boston Terrier",
        gender: "Đực",
        color: "Đen và trắng",
        special: "Có tính cách vui vẻ và yêu đời",
        username: "nhatlongvu"
    });
    
    await pet47.save();
    
    let pet48 = new Pet({
        petId: "03032024001948",
        name: "Lola",
        petPicture: "lola-nhatbinhmapcutie.jpg",
        age: 1,
        type: "Mèo",
        species: "Mèo Bengal",
        gender: "Cái",
        color: "Vàng đốm đen",
        special: "Rất hiếu kỳ và thích khám phá",
        username: "nhatbinhmapcutie"
    });
    
    await pet48.save();
    
    let pet49 = new Pet({
        petId: "03032024001949",
        name: "Bruno",
        petPicture: "bruno-kebian6931.jpg",
        age: 4,
        type: "Chó",
        species: "Boxer",
        gender: "Đực",
        color: "Nâu",
        special: "Rất trung thành và bảo vệ gia đình",
        username: "kebian6931"
    });
    
    await pet49.save();
    
    let pet50 = new Pet({
        petId: "03032024001950",
        name: "Nala",
        petPicture: "nala-nhatbinhmapcutie.jpg",
        age: 3,
        type: "Mèo",
        species: "Mèo Siamese",
        gender: "Cái",
        color: "Kem và nâu",
        special: "Rất thân thiện và thích được vuốt ve",
        username: "nhatbinhmapcutie"
    });
    
    await pet50.save();
    
    let pet51 = new Pet({
        petId: "03032024001955",
        name: "Bella",
        petPicture: "bella-ltqn1692.jpg",
        age: 1,
        type: "Mèo",
        species: "Border Collie",
        gender: "Cái",
        color: "Đen và trắng",
        special: "Rất năng động và thích học hỏi",
        username: "ltqn1692"
    });
    
    await pet51.save();

    let pet52 = new Pet({
        petId: "03032024001952",
        name: "Dexter",
        petPicture: "dexter-duongpham.jpg",
        age: 3,
        type: "Mèo",
        species: "Dachshund",
        gender: "Đực",
        color: "Đen và nâu",
        special: "Rất nhanh nhẹn và thích đuổi bắt",
        username: "duongpham"
    });
    
    await pet52.save();

    let notification1 = new Notification({
        notificationId: "03032024001901",
        date: "06/03/2024",
        event: "Tắm cho Milo",
        username: "trilephan"
    });

    await notification1.save()

    let notification2 = new Notification({
        notificationId: "03032024001902",
        date: "07/03/2024",
        event: "Khám sức khỏe định kỳ cho Bông",
        username: "cnbinhblvn"
    });
    
    await notification2.save();
    
    let notification3 = new Notification({
        notificationId: "03032024001903",
        date: "08/03/2024",
        event: "Tiêm phòng cho Lucy",
        username: "ltqn1692"
    });
    
    await notification3.save();
    
    let notification4 = new Notification({
        notificationId: "03032024001904",
        date: "09/03/2024",
        event: "Huấn luyện Max cách ngồi và bắt tay",
        username: "soulknight"
    });
    
    await notification4.save();
    
    let notification5 = new Notification({
        notificationId: "03032024001905",
        date: "10/03/2024",
        event: "Dọn dẹp chuồng cho Luna",
        username: "nguimethucung"
    });

    await notification5.save();

    let notification6 = new Notification({
        notificationId: "03032024001906",
        date: "11/03/2024",
        event: "Làm sạch tai cho Charlie",
        username: "meolaban"
    });
    
    await notification6.save();
    
    let notification7 = new Notification({
        notificationId: "03032024001907",
        date: "12/03/2024",
        event: "Tập luyện cho Sparky",
        username: "phatongtan"
    });
    
    await notification7.save();
    
    let notification8 = new Notification({
        notificationId: "03032024001908",
        date: "13/03/2024",
        event: "Kiểm tra lông cho Molly",
        username: "nhuquynhCute"
    });
    
    await notification8.save();
    
    let notification9 = new Notification({
        notificationId: "03032024001909",
        date: "14/03/2024",
        event: "Cắt móng cho Buddy",
        username: "haidongle"
    });
    
    await notification9.save();
    
    let notification10 = new Notification({
        notificationId: "03032024001910",
        date: "15/03/2024",
        event: "Kiểm tra da cho Zoe",
        username: "menot123"
    });
    
    await notification10.save();

    let notification11 = new Notification({
        notificationId: "03032024001911",
        date: "26/03/2024",
        event: "Khám phổi định kỳ cho Rocky",
        username: "nghiemngayngan"
    });
    
    await notification11.save()
    
    let notification12 = new Notification({
        notificationId: "03032024001912",
        date: "28/03/2024",
        event: "Lịch tập thể dục cho Murphy",
        username: "phatongtan"
    });
    
    await notification12.save()
    
    let notification13 = new Notification({
        notificationId: "03032024001913",
        date: "30/03/2024",
        event: "Kiểm tra da cho Loki",
        username: "nhatlongvu"
    });
    
    await notification13.save()
    
    let notification14 = new Notification({
        notificationId: "03032024001914",
        date: "01/04/2024",
        event: "Lịch tẩy giun cho Jasper",
        username: "diepchanphong"
    });
    
    await notification14.save()
    
    let notification15 = new Notification({
        notificationId: "03032024001915",
        date: "03/04/2024",
        event: "Kiểm tra răng cho Milo",
        username: "diepchanphong"
    });
    
    await notification15.save()
    
    let notification16 = new Notification({
        notificationId: "03032024001916",
        date: "05/04/2024",
        event: "Lịch tiêm phòng cho Piper",
        username: "meolaban"
    });
    
    await notification16.save()
    
    let notification17 = new Notification({
        notificationId: "03032024001917",
        date: "07/04/2024",
        event: "Kiểm tra sức khỏe tổng quát cho Frankie",
        username: "nhatlongvu"
    });
    
    await notification17.save()
    
    let notification18 = new Notification({
        notificationId: "03032024001918",
        date: "09/04/2024",
        event: "Lịch tắm rửa cho Lola",
        username: "nhatbinhmapcutie"
    });
    
    await notification18.save()
    
    let notification19 = new Notification({
        notificationId: "03032024001919",
        date: "11/04/2024",
        event: "Kiểm tra mắt cho Bruno",
        username: "kebian6931"
    });
    
    await notification19.save()
    
    let notification20 = new Notification({
        notificationId: "03032024001920",
        date: "13/04/2024",
        event: "Kiểm tra sức khỏe cho Dexter",
        username: "duongpham"
    });
    
    await notification20.save()

    let notification21 = new Notification({
        notificationId: "03032024001921",
        date: "15/04/2024",
        event: "Lịch cắt móng cho Nala",
        username: "nhatbinhmapcutie"
    });
    
    await notification21.save()
    
    let notification22 = new Notification({
        notificationId: "03032024001922",
        date: "17/04/2024",
        event: "Tập huấn luyện cho Bailey",
        username: "haidongle"
    });
    
    await notification22.save()
    
    let notification23 = new Notification({
        notificationId: "03032024001923",
        date: "19/04/2024",
        event: "Kiểm tra sức khỏe cho Cleo",
        username: "trilephan"
    });
    
    await notification23.save()
    
    let notification24 = new Notification({
        notificationId: "03032024001924",
        date: "21/04/2024",
        event: "Lịch tiêm vaccine cho Gizmo",
        username: "meolaban"
    });
    
    await notification24.save()
    
    let notification25 = new Notification({
        notificationId: "03032024001925",
        date: "23/04/2024",
        event: "Kiểm tra sức khỏe tổng quát cho Piper",
        username: "meolaban"
    });
    
    await notification25.save()
    
    let notification26 = new Notification({
        notificationId: "03032024001926",
        date: "25/04/2024",
        event: "Tắm thuốc chống ve cho Dexter",
        username: "duongpham"
    });
    
    await notification26.save()
    
    let notification27 = new Notification({
        notificationId: "03032024001927",
        date: "27/04/2024",
        event: "Kiểm tra sức khỏe cho Bella",
        username: "ltqn1692"
    });
    
    await notification27.save()
    
    let notification28 = new Notification({
        notificationId: "03032024001928",
        date: "29/04/2024",
        event: "Lịch huấn luyện cơ bản cho Bruno",
        username: "kebian6931"
    });
    
    await notification28.save()
    
    let notification29 = new Notification({
        notificationId: "03032024001929",
        date: "01/05/2024",
        event: "Kiểm tra sức khỏe cho Milo",
        username: "trilephan"
    });
    
    await notification29.save()
    
    let notification30 = new Notification({
        notificationId: "03032024001930",
        date: "03/05/2024",
        event: "Tắm cho Jasper",
        username: "diepchanphong"
    });
    
    await notification30.save()

    let notification31 = new Notification({
        notificationId: "03032024001931",
        date: "07/03/2024",
        event: "Kiểm tra da cho Luna",
        username: "nguimethucung"
    });
    
    await notification31.save()
    
    let notification32 = new Notification({
        notificationId: "03032024001932",
        date: "09/03/2024",
        event: "Kiểm tra sức khỏe tổng quát cho Toby",
        username: "haidongle"
    });
    
    await notification32.save()
    
    let notification33 = new Notification({
        notificationId: "03032024001933",
        date: "11/03/2024",
        event: "Tắm thuốc chống ve cho Jake",
        username: "cnbinhblvn"
    });
    
    await notification33.save()
    
    let notification34 = new Notification({
        notificationId: "03032024001934",
        date: "13/03/2024",
        event: "Lịch huấn luyện cơ bản cho Max",
        username: "soulknight"
    });
    
    await notification34.save()
    
    let notification35 = new Notification({
        notificationId: "03032024001935",
        date: "15/03/2024",
        event: "Kiểm tra mắt cho Hazel",
        username: "phatongtan"
    });
    
    await notification35.save()
    
    let notification36 = new Notification({
        notificationId: "03032024001936",
        date: "17/03/2024",
        event: "Kiểm tra răng cho Molly",
        username: "nhuquynhCute"
    });
    
    await notification36.save()
    
    let notification37 = new Notification({
        notificationId: "03032024001937",
        date: "19/03/2024",
        event: "Tắm cho Buddy",
        username: "haidongle"
    });
    
    await notification37.save()
    
    let notification38 = new Notification({
        notificationId: "03032024001938",
        date: "21/03/2024",
        event: "Kiểm tra sức khỏe cho Coco",
        username: "soulknight"
    });
    
    await notification38.save()
    
    let notification39 = new Notification({
        notificationId: "03032024001939",
        date: "23/03/2024",
        event: "Lịch cắt móng cho Oscar",
        username: "kebian6931"
    });
    
    await notification39.save()
    
    let notification40 = new Notification({
        notificationId: "03032024001940",
        date: "25/03/2024",
        event: "Kiểm tra sức khỏe tổng quát cho Ruby",
        username: "nhuquynhCute"
    });
    
    await notification40.save()

    let notification41 = new Notification({
        notificationId: "03032024001941",
        date: "15/03/2024",
        event: "Tiêm phòng cho Milo",
        username: "diepchanphong"
    });
    
    await notification41.save()
    
    let notification42 = new Notification({
        notificationId: "03032024001942",
        date: "16/03/2024",
        event: "Kiểm tra tai cho Gizmo",
        username: "meolaban"
    });
    
    await notification42.save()
    
    let notification43 = new Notification({
        notificationId: "03032024001943",
        date: "15/03/2024",
        event: "Lịch tẩy giun cho Jasper",
        username: "diepchanphong"
    });
    
    await notification43.save()
    
    let notification44 = new Notification({
        notificationId: "03032024001944",
        date: "16/03/2024",
        event: "Kiểm tra sức khỏe cho Zelda",
        username: "diepchanphong"
    });
    
    await notification44.save()
    
    let notification45 = new Notification({
        notificationId: "03032024001945",
        date: "17/03/2024",
        event: "Lịch tiêm phòng cho Charlie",
        username: "meolaban"
    });
    
    await notification45.save()
    
    let notification46 = new Notification({
        notificationId: "03032024001946",
        date: "15/03/2024",
        event: "Kiểm tra sức khỏe cho Piper",
        username: "meolaban"
    });
    
    await notification46.save()
    
    let notification47 = new Notification({
        notificationId: "03032024001947",
        date: "16/03/2024",
        event: "Lịch huấn luyện cho Frankie",
        username: "nhatlongvu"
    });
    
    await notification47.save()
    
    let notification48 = new Notification({
        notificationId: "03032024001948",
        date: "17/03/2024",
        event: "Kiểm tra da cho Lola",
        username: "nhatbinhmapcutie"
    });
    
    await notification48.save()
    
    let notification49 = new Notification({
        notificationId: "03032024001949",
        date: "15/03/2024",
        event: "Lịch tắm cho Bruno",
        username: "kebian6931"
    });
    
    await notification49.save()
    
    let notification50 = new Notification({
        notificationId: "03032024001950",
        date: "16/03/2024",
        event: "Kiểm tra mắt cho Nala",
        username: "nhatbinhmapcutie"
    });
    
    await notification50.save()

    let notification51 = new Notification({
        notificationId: "03032024001951",
        date: "04/03/2024",
        event: "Tắm cho Sasha",
        username: "soulknight"
    });
    
    await notification51.save()
    
    let notification52 = new Notification({
        notificationId: "03032024001952",
        date: "04/03/2024",
        event: "Kiểm tra sức khỏe cho Simba",
        username: "nhatlongvu"
    });
    
    await notification52.save()
    
    let notification53 = new Notification({
        notificationId: "03032024001953",
        date: "03/03/2024",
        event: "Kiểm tra sức khỏe cho Hazel",
        username: "phatongtan"
    });
    
    await notification53.save()
    
    let notification54 = new Notification({
        notificationId: "03032024001954",
        date: "03/03/2024",
        event: "Kiểm tra da cho Murphy",
        username: "phatongtan"
    });
    
    await notification54.save()
    
    let notification55 = new Notification({
        notificationId: "03032024001955",
        date: "04/03/2024",
        event: "Huấn luyện cho Willow",
        username: "nghiemngayngan"
    });
    
    await notification55.save()
    
    let notification56 = new Notification({
        notificationId: "03032024001956",
        date: "03/03/2024",
        event: "Tắm thuốc chống ve cho Toby",
        username: "haidongle"
    });
    
    await notification56.save()
    
    let notification57 = new Notification({
        notificationId: "03032024001957",
        date: "02/03/2024",
        event: "Kiểm tra mắt cho Milo",
        username: "trilephan"
    });
    
    await notification57.save()
    
    let notification58 = new Notification({
        notificationId: "03032024001958",
        date: "02/03/2024",
        event: "Sức khỏe tổng quát cho Bailey",
        username: "haidongle"
    });
    
    await notification58.save()
    
    let notification59 = new Notification({
        notificationId: "03032024001959",
        date: "04/03/2024",
        event: "Kiểm tra răng cho Cleo",
        username: "trilephan"
    });
    
    await notification59.save()
    
    let notification60 = new Notification({
        notificationId: "03032024001960",
        date: "03/03/2024",
        event: "Tiêm vaccine cho Dexter",
        username: "duongpham"
    });
    
    await notification60.save()

    let notification61 = new Notification({
        notificationId: "03032024001961",
        date: "02/03/2024",
        event: "Tiêm phòng cho Gizmo",
        username: "meolaban"
    });
    
    await notification61.save()
    
    let notification62 = new Notification({
        notificationId: "03032024001962",
        date: "01/03/2024",
        event: "Kiểm tra sức khỏe cho Jasper",
        username: "diepchanphong"
    });
    
    await notification62.save()
    
    let notification63 = new Notification({
        notificationId: "03032024001963",
        date: "01/03/2024",
        event: "Tắm cho Zelda",
        username: "diepchanphong"
    });
    
    await notification63.save()
    
    let notification64 = new Notification({
        notificationId: "03032024001964",
        date: "02/03/2024",
        event: "Huấn luyện tính năng động cho Milo",
        username: "diepchanphong"
    });
    
    await notification64.save()
    
    let notification65 = new Notification({
        notificationId: "03032024001965",
        date: "03/03/2024",
        event: "Khám bệnh cho Piper",
        username: "meolaban"
    });
    
    await notification65.save()
    
    let notification66 = new Notification({
        notificationId: "03032024001966",
        date: "04/03/2024",
        event: "Kiểm tra sức khỏe cho Frankie",
        username: "nhatlongvu"
    });
    
    await notification66.save()
    
    let notification67 = new Notification({
        notificationId: "03032024001967",
        date: "02/03/2024",
        event: "Khám da cho Lola",
        username: "nhatbinhmapcutie"
    });
    
    await notification67.save()
    
    let notification68 = new Notification({
        notificationId: "03032024001968",
        date: "01/03/2024",
        event: "Kiểm tra nướu cho Bruno",
        username: "kebian6931"
    });
    
    await notification68.save()
    
    let notification69 = new Notification({
        notificationId: "03032024001969",
        date: "01/03/2024",
        event: "Tắm cho Nala",
        username: "nhatbinhmapcutie"
    });
    
    await notification69.save()
    
    let notification70 = new Notification({
        notificationId: "03032024001970",
        date: "02/03/2024",
        event: "Tiêm vaccine cho Bella",
        username: "ltqn1692"
    });
    
    await notification70.save()

    let notification71 = new Notification({
        notificationId: "03032024001971",
        date: "03/03/2024",
        event: "Tập thể dục cho Dexter",
        username: "duongpham"
    });
    
    await notification71.save()
    
    let notification72 = new Notification({
        notificationId: "03032024001972",
        date: "04/03/2024",
        event: "Điều trị da cho Milo",
        username: "trilephan"
    });
    
    await notification72.save()
    
    let notification73 = new Notification({
        notificationId: "03032024001973",
        date: "05/03/2024",
        event: "Kiểm tra mắt cho Hazel",
        username: "phatongtan"
    });
    
    await notification73.save()
    
    let notification74 = new Notification({
        notificationId: "03032024001974",
        date: "06/03/2024",
        event: "Chăm sóc đặc biệt cho Murphy",
        username: "phatongtan"
    });
    
    await notification74.save()
    
    let notification75 = new Notification({
        notificationId: "03032024001975",
        date: "07/03/2024",
        event: "Kiểm tra sức khỏe tổng quát cho Willow",
        username: "nghiemngayngan"
    });
    
    await notification75.save()
    
    let notification76 = new Notification({
        notificationId: "03032024001976",
        date: "08/03/2024",
        event: "Làm đẹp cho Toby",
        username: "haidongle"
    });
    
    await notification76.save()
    
    let notification77 = new Notification({
        notificationId: "03032024001977",
        date: "09/03/2024",
        event: "Kiểm tra hô hấp cho Milo",
        username: "trilephan"
    });
    
    await notification77.save()
    
    let notification78 = new Notification({
        notificationId: "03032024001978",
        date: "10/03/2024",
        event: "Kiểm tra sức khỏe cho Bailey",
        username: "haidongle"
    });
    
    await notification78.save()
    
    let notification79 = new Notification({
        notificationId: "03032024001979",
        date: "11/03/2024",
        event: "Huấn luyện cơ bản cho Cleo",
        username: "trilephan"
    });
    
    await notification79.save()
    
    let notification80 = new Notification({
        notificationId: "03032024001980",
        date: "12/03/2024",
        event: "Tập thể dục buổi sáng cho Dexter",
        username: "nhatlongvu"
    });
    
    await notification80.save()

    let notification81 = new Notification({
        notificationId: "03032024001971",
        date: "01/03/2024",
        event: "Kiểm tra sức khỏe tổng quát cho Mun",
        username: "cnbinhblvn"
    });
    
    await notification81.save()
    
    let notification82 = new Notification({
        notificationId: "03032024001972",
        date: "02/03/2024",
        event: "Lịch hẹn tư vấn dinh dưỡng cho Bông",
        username: "cnbinhblvn"
    });
    
    await notification82.save()
    
    let notification83 = new Notification({
        notificationId: "03032024001973",
        date: "03/03/2024",
        event: "Lịch hẹn cắt tỉa lông cho Lucy",
        username: "ltqn1692"
    });
    
    await notification83.save()
    
    let notification84 = new Notification({
        notificationId: "03032024001974",
        date: "04/03/2024",
        event: "Kiểm tra răng miệng cho Bella",
        username: "ltqn1692"
    });
    
    await notification84.save()
    
    let notification85 = new Notification({
        notificationId: "03032024001975",
        date: "05/03/2024",
        event: "Tiêm phòng cho Max",
        username: "cnbinhblvn"
    });
    
    await notification85.save()
    
    let notification86 = new Notification({
        notificationId: "03032024001976",
        date: "06/03/2024",
        event: "Huấn luyện cơ bản cho Bông",
        username: "cnbinhblvn"
    });
    
    await notification86.save()
    
    let notification87 = new Notification({
        notificationId: "03032024001977",
        date: "07/03/2024",
        event: "Kiểm tra sức khỏe cho Luna",
        username: "ltqn1692"
    });
    
    await notification87.save()
    
    let notification88 = new Notification({
        notificationId: "03032024001978",
        date: "08/03/2024",
        event: "Lịch hẹn chăm sóc da cho Charlie",
        username: "cnbinhblvn"
    });
    
    await notification88.save()
    
    let notification89 = new Notification({
        notificationId: "03032024001979",
        date: "09/03/2024",
        event: "Kiểm tra mắt cho Lucy",
        username: "ltqn1692"
    });
    
    await notification89.save()
    
    let notification90 = new Notification({
        notificationId: "03032024001980",
        date: "10/03/2024",
        event: "Tư vấn về chế độ ăn cho Mun",
        username: "cnbinhblvn"
    });
    
    await notification90.save()

    let notification91 = new Notification({
        notificationId: "03032024001991",
        date: "11/03/2024",
        event: "Tư vấn phương pháp huấn luyện cho Bông",
        username: "cnbinhblvn"
    });
    
    await notification91.save()
    
    let notification92 = new Notification({
        notificationId: "03032024001992",
        date: "12/03/2024",
        event: "Lịch hẹn tái kiểm tra sức khỏe cho Lucy",
        username: "ltqn1692"
    });
    
    await notification92.save()
    
    let notification93 = new Notification({
        notificationId: "03032024001993",
        date: "13/03/2024",
        event: "Lịch hẹn chăm sóc lông cho Max",
        username: "cnbinhblvn"
    });
    
    await notification93.save()
    
    let notification94 = new Notification({
        notificationId: "03032024001994",
        date: "14/03/2024",
        event: "Kiểm tra sức khỏe định kỳ cho Bella",
        username: "ltqn1692"
    });
    
    await notification94.save()
    
    let notification95 = new Notification({
        notificationId: "03032024001995",
        date: "15/03/2024",
        event: "Lịch hẹn tiêm phòng cho Luna",
        username: "ltqn1692"
    });
    
    await notification95.save()
    
    let notification96 = new Notification({
        notificationId: "03032024001996",
        date: "16/03/2024",
        event: "Huấn luyện cảm xúc cho Charlie",
        username: "cnbinhblvn"
    });
    
    await notification96.save()
    
    let notification97 = new Notification({
        notificationId: "03032024001997",
        date: "17/03/2024",
        event: "Kiểm tra sức khỏe cho Sparky",
        username: "cnbinhblvn"
    });
    
    await notification97.save()
    
    let notification98 = new Notification({
        notificationId: "03032024001998",
        date: "18/03/2024",
        event: "Lịch hẹn chăm sóc sức khỏe tinh thần cho Molly",
        username: "ltqn1692"
    });
    
    await notification98.save()
    
    let notification99 = new Notification({
        notificationId: "03032024001999",
        date: "19/03/2024",
        event: "Kiểm tra mắt cho Buddy",
        username: "cnbinhblvn"
    });
    
    await notification99.save()
    
    let notification100 = new Notification({
        notificationId: "03032024002000",
        date: "20/03/2024",
        event: "Tư vấn về chế độ dinh dưỡng cho Zoe",
        username: "ltqn1692"
    });
    
    await notification100.save()

    let schedule1 = new Schedule({
        scheduleId: "05032024190320",
        time: "07/03/2024",
        activity: "Thăm khám sức khỏe",
        purpose: "Kiểm tra sức khỏe tổng quát cho Mun",
        contact: "Bệnh viện thú y PetCare Plus",
        note: "Kiểm tra sức khỏe định kỳ, bao gồm tim mạch và huyết học",
        result: "Mun khỏe mạnh, không có vấn đề gì nổi bật",
        createdTime: "05-03-2024 19:03:20",
        updatedTime: "05-03-2024 19:03:20",
        username: "cnbinhblvn"
    });
    
    await schedule1.save()
    
    let schedule2 = new Schedule({
        scheduleId: "05032024190321",
        time: "08/03/2024",
        activity: "Dịch vụ làm đẹp",
        purpose: "Làm đẹp toàn diện cho Bông",
        contact: "Salon làm đẹp PetElite",
        note: "Làm đẹp toàn diện bao gồm cắt tỉa lông và tắm spa",
        result: "Bông trông sạch sẽ và gọn gàng hơn",
        createdTime: "05-03-2024 19:03:21",
        updatedTime: "05-03-2024 19:03:21",
        username: "cnbinhblvn"
    });
    
    await schedule2.save()
    
    let schedule3 = new Schedule({
        scheduleId: "05032024190322",
        time: "09/03/2024",
        activity: "Khám sức khỏe định kỳ",
        purpose: "Kiểm tra sức khỏe định kỳ cho Lucy",
        contact: "Trung tâm y tế động vật HealthyPaws",
        note: "Kiểm tra sức khỏe tổng quát, chú ý đến hệ tiêu hóa và da",
        result: "Lucy cần điều chỉnh chế độ ăn để cải thiện sức khỏe tiêu hóa",
        createdTime: "05-03-2024 19:03:22",
        updatedTime: "05-03-2024 19:03:22",
        username: "ltqn1692"
    });
    
    await schedule3.save()
    
    let schedule4 = new Schedule({
        scheduleId: "05032024190323",
        time: "10/03/2024",
        activity: "Dịch vụ làm đẹp",
        purpose: "Spa và chăm sóc da cho Max",
        contact: "Salon thú cưng LuxuryPaws",
        note: "Tắm spa và chăm sóc da đặc biệt cho da nhạy cảm",
        result: "Max cảm thấy thoải mái và da khỏe mạnh hơn",
        createdTime: "05-03-2024 19:03:23",
        updatedTime: "05-03-2024 19:03:23",
        username: "soulknight"
    });
    
    await schedule4.save()
    
    let schedule5 = new Schedule({
        scheduleId: "05032024190324",
        time: "11/03/2024",
        activity: "Thăm khám sức khỏe",
        purpose: "Kiểm tra sức khỏe tổng quát cho Luna",
        contact: "Bệnh viện thú cưng FourPaws",
        note: "Kiểm tra sức khỏe tổng quát, chú ý đến hệ tiêu hóa",
        result: "Luna khỏe mạnh, không có vấn đề gì",
        createdTime: "05-03-2024 19:03:24",
        updatedTime: "05-03-2024 19:03:24",
        username: "nguimethucung"
    });
    
    await schedule5.save()
    
    let schedule6 = new Schedule({
        scheduleId: "05032024190325",
        time: "12/03/2024",
        activity: "Khám sức khỏe định kỳ",
        purpose: "Kiểm tra sức khỏe định kỳ cho Charlie",
        contact: "Trung tâm y tế động vật VetPlus",
        note: "Kiểm tra định kỳ, bao gồm chức năng gan và thận",
        result: "Charlie cần chú ý đến chế độ ăn ít protein",
        createdTime: "05-03-2024 19:03:25",
        updatedTime: "05-03-2024 19:03:25",
        username: "meolaban"
    });
    
    await schedule6.save()
    
    let schedule7 = new Schedule({
        scheduleId: "05032024190326",
        time: "13/03/2024",
        activity: "Dịch vụ làm đẹp",
        purpose: "Cắt tỉa lông và làm đẹp cho Sparky",
        contact: "Salon làm đẹp PetChic",
        note: "Cắt tỉa lông và chăm sóc da, làm đẹp móng",
        result: "Sparky trông thật sạch sẽ và thời trang",
        createdTime: "05-03-2024 19:03:26",
        updatedTime: "05-03-2024 19:03:26",
        username: "phatongtan"
    });
    
    await schedule7.save()
    
    let schedule8 = new Schedule({
        scheduleId: "05032024190327",
        time: "14/03/2024",
        activity: "Thăm khám sức khỏe",
        purpose: "Kiểm tra sức khỏe tổng quát cho Molly",
        contact: "Bệnh viện thú y PetVet Care",
        note: "Kiểm tra sức khỏe tổng quát, bao gồm kiểm tra mắt và tai",
        result: "Molly cần chăm sóc đặc biệt cho mắt và tai do dấu hiệu viêm",
        createdTime: "05-03-2024 19:03:27",
        updatedTime: "05-03-2024 19:03:27",
        username: "nhuquynhCute"
    });
    
    await schedule8.save()

    let schedule9 = new Schedule({
        scheduleId: "05032024190336",
        time: "15/03/2024",
        activity: "Khám sức khỏe định kỳ",
        purpose: "Kiểm tra sức khỏe tổng quát cho Buddy",
        contact: "Trung tâm y tế PetHealth",
        note: "Kiểm tra sức khỏe định kỳ, bao gồm tim mạch và hô hấp",
        result: "Buddy khỏe mạnh, không có vấn đề gì",
        createdTime: "05-03-2024 19:03:36",
        updatedTime: "05-03-2024 19:03:36",
        username: "baobinht2"
    });
    
    await schedule9.save()
    
    let schedule10 = new Schedule({
        scheduleId: "05032024190337",
        time: "16/03/2024",
        activity: "Dịch vụ làm đẹp",
        purpose: "Spa và làm đẹp cho Zoe",
        contact: "Salon thú cưng PetGlamour",
        note: "Spa thư giãn và cắt tỉa lông",
        result: "Zoe trông sạch sẽ và tươi mới",
        createdTime: "05-03-2024 19:03:37",
        updatedTime: "05-03-2024 19:03:37",
        username: "menot123"
    });
    
    await schedule10.save()
    
    let schedule11 = new Schedule({
        scheduleId: "05032024190338",
        time: "17/03/2024",
        activity: "Thăm khám sức khỏe",
        purpose: "Kiểm tra sức khỏe tổng quát cho Daisy",
        contact: "Phòng khám đa khoa PetCare",
        note: "Kiểm tra sức khỏe tổng quát, chú ý tới hệ tiêu hóa",
        result: "Daisy cần chú ý chế độ ăn uống",
        createdTime: "05-03-2024 19:03:38",
        updatedTime: "05-03-2024 19:03:38",
        username: "nguimethucung"
    });
    
    await schedule11.save()
    
    let schedule12 = new Schedule({
        scheduleId: "05032024190339",
        time: "18/03/2024",
        activity: "Khám sức khỏe định kỳ",
        purpose: "Kiểm tra sức khỏe định kỳ cho Oscar",
        contact: "Bệnh viện thú y PetHealth",
        note: "Kiểm tra sức khỏe định kỳ, bao gồm kiểm tra huyết học và chức năng gan",
        result: "Oscar cần được theo dõi chức năng gan",
        createdTime: "05-03-2024 19:03:39",
        updatedTime: "05-03-2024 19:03:39",
        username: "kebian6931"
    });
    
    await schedule12.save()
    
    let schedule13 = new Schedule({
        scheduleId: "05032024190340",
        time: "19/03/2024",
        activity: "Dịch vụ làm đẹp",
        purpose: "Tắm rửa và làm đẹp cho Bella",
        contact: "Spa thú cưng PetHeaven",
        note: "Làm sạch lông và cắt tỉa móng",
        result: "Bella trở nên sạch sẽ và gọn gàng",
        createdTime: "05-03-2024 19:03:40",
        updatedTime: "05-03-2024 19:03:40",
        username: "nhuquynhCute"
    });
    
    await schedule13.save()
    
    let schedule14 = new Schedule({
        scheduleId: "05032024190341",
        time: "20/03/2024",
        activity: "Thăm khám sức khỏe",
        purpose: "Kiểm tra sức khỏe tổng quát cho Rex",
        contact: "Trung tâm y tế PetWellness",
        note: "Kiểm tra tổng quát, chú trọng tới vấn đề da",
        result: "Rex có một số vấn đề về da cần được điều trị",
        createdTime: "05-03-2024 19:03:41",
        updatedTime: "05-03-2024 19:03:41",
        username: "baobinht2"
    });
    
    await schedule14.save()
    
    let schedule15 = new Schedule({
        scheduleId: "05032024190342",
        time: "21/03/2024",
        activity: "Khám sức khỏe định kỳ",
        purpose: "Kiểm tra sức khỏe định kỳ cho Lily",
        contact: "Bệnh viện thú y AnimalHealth",
        note: "Kiểm tra định kỳ, bao gồm xét nghiệm máu",
        result: "Lily khỏe mạnh, không có vấn đề gì",
        createdTime: "05-03-2024 19:03:42",
        updatedTime: "05-03-2024 19:03:42",
        username: "menot123"
    });
    
    await schedule15.save()
    
    let schedule16 = new Schedule({
        scheduleId: "05032024190343",
        time: "22/03/2024",
        activity: "Dịch vụ làm đẹp",
        purpose: "Chăm sóc lông và làm đẹp cho Coco",
        contact: "Salon làm đẹp thú cưng PetStyle",
        note: "Làm đẹp toàn diện, bao gồm cắt tỉa lông và tắm spa",
        result: "Coco trông rất tươi mới và đáng yêu",
        createdTime: "05-03-2024 19:03:43",
        updatedTime: "05-03-2024 19:03:43",
        username: "soulknight"
    });
    
    await schedule16.save()
    
    let schedule17 = new Schedule({
        scheduleId: "05032024190344",
        time: "23/03/2024",
        activity: "Thăm khám sức khỏe",
        purpose: "Kiểm tra sức khỏe tổng quát cho Jake",
        contact: "Phòng khám thú y VetCare",
        note: "Kiểm tra sức khỏe tổng quát, bao gồm tim mạch và kiểm tra huyết học",
        result: "Jake khỏe mạnh, không có vấn đề gì",
        createdTime: "05-03-2024 19:03:44",
        updatedTime: "05-03-2024 19:03:44",
        username: "cnbinhblvn"
    });
    
    await schedule17.save()
    
    let schedule18 = new Schedule({
        scheduleId: "05032024190345",
        time: "24/03/2024",
        activity: "Khám sức khỏe định kỳ",
        purpose: "Kiểm tra sức khỏe định kỳ cho Angel",
        contact: "Bệnh viện thú y PetLife",
        note: "Kiểm tra định kỳ, chú ý tới vấn đề hô hấp",
        result: "Angel cần được theo dõi thêm về hệ hô hấp",
        createdTime: "05-03-2024 19:03:45",
        updatedTime: "05-03-2024 19:03:45",
        username: "nguimethucung"
    });
    
    await schedule18.save()
    
    let schedule19 = new Schedule({
        scheduleId: "05032024190346",
        time: "25/03/2024",
        activity: "Dịch vụ làm đẹp",
        purpose: "Làm đẹp và chăm sóc lông cho Duke",
        contact: "Salon thú cưng PetLuxury",
        note: "Làm sạch, tắm spa và cắt tỉa lông",
        result: "Duke trông sạch sẽ và đẹp mắt",
        createdTime: "05-03-2024 19:03:46",
        updatedTime: "05-03-2024 19:03:46",
        username: "kebian6931"
    });
    
    await schedule19.save()
    
    let schedule20 = new Schedule({
        scheduleId: "05032024190347",
        time: "26/03/2024",
        activity: "Thăm khám sức khỏe",
        purpose: "Kiểm tra sức khỏe tổng quát cho Ruby",
        contact: "Phòng khám đa khoa PetHealth",
        note: "Kiểm tra sức khỏe tổng quát, bao gồm kiểm tra da",
        result: "Ruby cần được chăm sóc da đặc biệt",
        createdTime: "05-03-2024 19:03:47",
        updatedTime: "05-03-2024 19:03:47",
        username: "nhuquynhCute"
    });
    
    await schedule20.save()

    let schedule21 = new Schedule({
        scheduleId: "05032024190348",
        time: "27/03/2024",
        activity: "Thăm khám sức khỏe",
        purpose: "Kiểm tra sức khỏe tổng quát cho Piper",
        contact: "Bệnh viện thú y PetCare Plus",
        note: "Kiểm tra sức khỏe định kỳ, bao gồm tim mạch và chức năng thận",
        result: "Piper khỏe mạnh, không có vấn đề gì",
        createdTime: "05-03-2024 19:03:48",
        updatedTime: "05-03-2024 19:03:48",
        username: "meolaban"
    });

    await schedule21.save()
    
    let schedule22 = new Schedule({
        scheduleId: "05032024190349",
        time: "28/03/2024",
        activity: "Dịch vụ làm đẹp",
        purpose: "Làm đẹp toàn diện cho Frankie",
        contact: "Salon làm đẹp PetElite",
        note: "Làm đẹp toàn diện bao gồm cắt tỉa lông và tắm spa",
        result: "Frankie trông sạch sẽ và gọn gàng hơn",
        createdTime: "05-03-2024 19:03:49",
        updatedTime: "05-03-2024 19:03:49",
        username: "nhatlongvu"
    });

    await schedule22.save()
    
    let schedule23 = new Schedule({
        scheduleId: "05032024190350",
        time: "29/03/2024",
        activity: "Khám sức khỏe định kỳ",
        purpose: "Kiểm tra sức khỏe định kỳ cho Lola",
        contact: "Trung tâm y tế động vật HealthyPaws",
        note: "Kiểm tra sức khỏe tổng quát, chú ý đến hệ tiêu hóa và da",
        result: "Lola cần điều chỉnh chế độ ăn để cải thiện sức khỏe tiêu hóa",
        createdTime: "05-03-2024 19:03:50",
        updatedTime: "05-03-2024 19:03:50",
        username: "nhatbinhmapcutie"
    });

    await schedule23.save()
    
    let schedule24 = new Schedule({
        scheduleId: "05032024190351",
        time: "30/03/2024",
        activity: "Dịch vụ làm đẹp",
        purpose: "Spa và chăm sóc da cho Bruno",
        contact: "Salon thú cưng LuxuryPaws",
        note: "Tắm spa và chăm sóc da đặc biệt cho da nhạy cảm",
        result: "Bruno cảm thấy thoải mái và da khỏe mạnh hơn",
        createdTime: "05-03-2024 19:03:51",
        updatedTime: "05-03-2024 19:03:51",
        username: "kebian6931"
    });

    await schedule24.save()
    
    let schedule25 = new Schedule({
        scheduleId: "05032024190352",
        time: "31/03/2024",
        activity: "Thăm khám sức khỏe",
        purpose: "Kiểm tra sức khỏe tổng quát cho Nala",
        contact: "Bệnh viện thú cưng FourPaws",
        note: "Kiểm tra sức khỏe tổng quát, chú ý đến hệ tiêu hóa",
        result: "Nala khỏe mạnh, không có vấn đề gì",
        createdTime: "05-03-2024 19:03:52",
        updatedTime: "05-03-2024 19:03:52",
        username: "nhatbinhmapcutie"
    });

    await schedule25.save()
    
    let schedule26 = new Schedule({
        scheduleId: "05032024190353",
        time: "01/04/2024",
        activity: "Khám sức khỏe định kỳ",
        purpose: "Kiểm tra sức khỏe định kỳ cho Bella (Border Collie)",
        contact: "Trung tâm y tế động vật VetPlus",
        note: "Kiểm tra định kỳ, bao gồm chức năng gan và thận",
        result: "Bella cần chú ý đến chế độ ăn ít protein",
        createdTime: "05-03-2024 19:03:53",
        updatedTime: "05-03-2024 19:03:53",
        username: "ltqn1692"
    });

    await schedule26.save()
    
    let schedule27 = new Schedule({
        scheduleId: "05032024190354",
        time: "02/04/2024",
        activity: "Dịch vụ làm đẹp",
        purpose: "Cắt tỉa lông và làm đẹp cho Dexter (Dachshund)",
        contact: "Salon làm đẹp PetChic",
        note: "Cắt tỉa lông và chăm sóc da, làm đẹp móng",
        result: "Dexter trông thật sạch sẽ và thời trang",
        createdTime: "05-03-2024 19:03:54",
        updatedTime: "05-03-2024 19:03:54",
        username: "duongpham"
    });

    await schedule27.save()
    
    let schedule28 = new Schedule({
        scheduleId: "05032024190355",
        time: "03/04/2024",
        activity: "Thăm khám sức khỏe",
        purpose: "Kiểm tra sức khỏe tổng quát cho Dexter (Mèo)",
        contact: "Bệnh viện thú y PetVet Care",
        note: "Kiểm tra sức khỏe tổng quát, bao gồm kiểm tra mắt và tai",
        result: "Dexter cần chăm sóc đặc biệt cho mắt và tai do dấu hiệu viêm",
        createdTime: "05-03-2024 19:03:55",
        updatedTime: "05-03-2024 19:03:55",
        username: "menot123"
    });

    await schedule28.save()
    
    let schedule29 = new Schedule({
        scheduleId: "05032024190356",
        time: "04/04/2024",
        activity: "Khám sức khỏe định kỳ",
        purpose: "Kiểm tra sức khỏe định kỳ cho Gizmo",
        contact: "Trung tâm y tế PetHealth",
        note: "Kiểm tra sức khỏe định kỳ, bao gồm tim mạch và hô hấp",
        result: "Gizmo khỏe mạnh, không có vấn đề gì",
        createdTime: "05-03-2024 19:03:56",
        updatedTime: "05-03-2024 19:03:56",
        username: "meolaban"
    });
    
    await schedule29.save()
    
    let schedule30 = new Schedule({
        scheduleId: "05032024190357",
        time: "05/04/2024",
        activity: "Dịch vụ làm đẹp",
        purpose: "Spa và làm đẹp cho Jasper",
        contact: "Salon thú cưng PetGlamour",
        note: "Spa thư giãn và cắt tỉa lông",
        result: "Jasper trông sạch sẽ và tươi mới",
        createdTime: "05-03-2024 19:03:57",
        updatedTime: "05-03-2024 19:03:57",
        username: "diepchanphong"
    });

    await schedule30.save()

    let schedule31 = new Schedule({
        scheduleId: "05032024190358",
        time: "06/04/2024",
        activity: "Thăm khám sức khỏe",
        purpose: "Kiểm tra sức khỏe tổng quát cho Zelda",
        contact: "Bệnh viện thú y PetCare Plus",
        note: "Kiểm tra sức khỏe định kỳ, bao gồm tim mạch và huyết học",
        result: "Zelda khỏe mạnh, không có vấn đề gì",
        createdTime: "05-03-2024 19:03:58",
        updatedTime: "05-03-2024 19:03:58",
        username: "diepchanphong"
    });
    
    await schedule31.save();
    
    let schedule32 = new Schedule({
        scheduleId: "05032024190359",
        time: "07/04/2024",
        activity: "Dịch vụ làm đẹp",
        purpose: "Làm đẹp toàn diện cho Milo (French Bulldog)",
        contact: "Salon làm đẹp PetElite",
        note: "Làm đẹp toàn diện bao gồm cắt tỉa lông và tắm spa",
        result: "Milo trông sạch sẽ và gọn gàng hơn",
        createdTime: "05-03-2024 19:03:59",
        updatedTime: "05-03-2024 19:03:59",
        username: "diepchanphong"
    });
    
    await schedule32.save();
    
    let schedule33 = new Schedule({
        scheduleId: "05032024190360",
        time: "08/04/2024",
        activity: "Khám sức khỏe định kỳ",
        purpose: "Kiểm tra sức khỏe định kỳ cho Piper",
        contact: "Trung tâm y tế động vật HealthyPaws",
        note: "Kiểm tra sức khỏe tổng quát, chú ý đến hệ tiêu hóa và da",
        result: "Piper cần điều chỉnh chế độ ăn để cải thiện sức khỏe tiêu hóa",
        createdTime: "05-03-2024 19:04:00",
        updatedTime: "05-03-2024 19:04:00",
        username: "meolaban"
    });
    
    await schedule33.save();
    
    let schedule34 = new Schedule({
        scheduleId: "05032024190361",
        time: "09/04/2024",
        activity: "Dịch vụ làm đẹp",
        purpose: "Spa và chăm sóc da cho Frankie",
        contact: "Salon thú cưng LuxuryPaws",
        note: "Tắm spa và chăm sóc da đặc biệt cho da nhạy cảm",
        result: "Frankie cảm thấy thoải mái và da khỏe mạnh hơn",
        createdTime: "05-03-2024 19:04:01",
        updatedTime: "05-03-2024 19:04:01",
        username: "nhatlongvu"
    });
    
    await schedule34.save();
    
    let schedule35 = new Schedule({
        scheduleId: "05032024190362",
        time: "10/04/2024",
        activity: "Thăm khám sức khỏe",
        purpose: "Kiểm tra sức khỏe tổng quát cho Lola",
        contact: "Bệnh viện thú cưng FourPaws",
        note: "Kiểm tra sức khỏe tổng quát, chú ý đến hệ tiêu hóa",
        result: "Lola khỏe mạnh, không có vấn đề gì",
        createdTime: "05-03-2024 19:04:02",
        updatedTime: "05-03-2024 19:04:02",
        username: "nhatbinhmapcutie"
    });
    
    await schedule35.save();

    let schedule36 = new Schedule({
        scheduleId: "05032024190363",
        time: "11/04/2024",
        activity: "Thăm khám sức khỏe",
        purpose: "Kiểm tra sức khỏe tổng quát cho Gizmo",
        contact: "Bệnh viện thú y PetCare Plus",
        note: "Kiểm tra sức khỏe định kỳ, bao gồm tim mạch và huyết học",
        result: "Gizmo khỏe mạnh, không có vấn đề gì",
        createdTime: "05-03-2024 19:04:03",
        updatedTime: "05-03-2024 19:04:03",
        username: "meolaban"
    });
    
    await schedule36.save();
    
    let schedule37 = new Schedule({
        scheduleId: "05032024190364",
        time: "12/04/2024",
        activity: "Dịch vụ làm đẹp",
        purpose: "Làm đẹp toàn diện cho Jasper",
        contact: "Salon làm đẹp PetElite",
        note: "Làm đẹp toàn diện bao gồm cắt tỉa lông và tắm spa",
        result: "Jasper trông sạch sẽ và gọn gàng hơn",
        createdTime: "05-03-2024 19:04:04",
        updatedTime: "05-03-2024 19:04:04",
        username: "diepchanphong"
    });
    
    await schedule37.save();
    
    let schedule38 = new Schedule({
        scheduleId: "05032024190365",
        time: "13/04/2024",
        activity: "Khám sức khỏe định kỳ",
        purpose: "Kiểm tra sức khỏe định kỳ cho Piper",
        contact: "Trung tâm y tế động vật HealthyPaws",
        note: "Kiểm tra sức khỏe tổng quát, chú ý đến hệ tiêu hóa và da",
        result: "Piper cần điều chỉnh chế độ ăn để cải thiện sức khỏe tiêu hóa",
        createdTime: "05-03-2024 19:04:05",
        updatedTime: "05-03-2024 19:04:05",
        username: "meolaban"
    });
    
    await schedule38.save();
    
    let schedule39 = new Schedule({
        scheduleId: "05032024190366",
        time: "14/04/2024",
        activity: "Dịch vụ làm đẹp",
        purpose: "Spa và chăm sóc da cho Frankie",
        contact: "Salon thú cưng LuxuryPaws",
        note: "Tắm spa và chăm sóc da đặc biệt cho da nhạy cảm",
        result: "Frankie cảm thấy thoải mái và da khỏe mạnh hơn",
        createdTime: "05-03-2024 19:04:06",
        updatedTime: "05-03-2024 19:04:06",
        username: "nhatlongvu"
    });
    
    await schedule39.save();
    
    let schedule40 = new Schedule({
        scheduleId: "05032024190367",
        time: "15/04/2024",
        activity: "Thăm khám sức khỏe",
        purpose: "Kiểm tra sức khỏe tổng quát cho Lola",
        contact: "Bệnh viện thú cưng FourPaws",
        note: "Kiểm tra sức khỏe tổng quát, chú ý đến hệ tiêu hóa",
        result: "Lola khỏe mạnh, không có vấn đề gì",
        createdTime: "05-03-2024 19:04:07",
        updatedTime: "05-03-2024 19:04:07",
        username: "nhatbinhmapcutie"
    });
    
    await schedule40.save();

    let schedule41 = new Schedule({
        scheduleId: "05032024190368",
        time: "16/04/2024",
        activity: "Thăm khám sức khỏe",
        purpose: "Kiểm tra sức khỏe tổng quát cho Bruno",
        contact: "Bệnh viện thú y PetVet Care",
        note: "Kiểm tra sức khỏe tổng quát, bao gồm kiểm tra mắt và tai",
        result: "Bruno cần chăm sóc đặc biệt cho mắt và tai do dấu hiệu viêm",
        createdTime: "05-03-2024 19:04:08",
        updatedTime: "05-03-2024 19:04:08",
        username: "duongpham"
    });
    
    await schedule41.save();
    
    let schedule42 = new Schedule({
        scheduleId: "05032024190369",
        time: "17/04/2024",
        activity: "Dịch vụ làm đẹp",
        purpose: "Làm đẹp toàn diện cho Nala",
        contact: "Salon làm đẹp PetChic",
        note: "Làm đẹp toàn diện bao gồm cắt tỉa lông và tắm spa",
        result: "Nala trông sạch sẽ và gọn gàng hơn",
        createdTime: "05-03-2024 19:04:09",
        updatedTime: "05-03-2024 19:04:09",
        username: "soulknight"
    });
    
    await schedule42.save();
    
    let schedule43 = new Schedule({
        scheduleId: "05032024190370",
        time: "18/04/2024",
        activity: "Khám sức khỏe định kỳ",
        purpose: "Kiểm tra sức khỏe định kỳ cho Gizmo",
        contact: "Trung tâm y tế PetHealth",
        note: "Kiểm tra sức khỏe định kỳ, bao gồm tim mạch và hô hấp",
        result: "Gizmo khỏe mạnh, không có vấn đề gì",
        createdTime: "05-03-2024 19:04:10",
        updatedTime: "05-03-2024 19:04:10",
        username: "phatongtan"
    });
    
    await schedule43.save();
    
    let schedule44 = new Schedule({
        scheduleId: "05032024190371",
        time: "19/04/2024",
        activity: "Dịch vụ làm đẹp",
        purpose: "Spa và làm đẹp cho Jasper",
        contact: "Salon thú cưng LuxuryPaws",
        note: "Spa thư giãn và cắt tỉa lông",
        result: "Jasper trông sạch sẽ và tươi mới",
        createdTime: "05-03-2024 19:04:11",
        updatedTime: "05-03-2024 19:04:11",
        username: "haidongle"
    });
    
    await schedule44.save();
    
    let schedule45 = new Schedule({
        scheduleId: "05032024190372",
        time: "20/04/2024",
        activity: "Thăm khám sức khỏe",
        purpose: "Kiểm tra sức khỏe tổng quát cho Piper",
        contact: "Phòng khám thú y VetCare",
        note: "Kiểm tra sức khỏe tổng quát, bao gồm tim mạch và kiểm tra huyết học",
        result: "Piper khỏe mạnh, không có vấn đề gì",
        createdTime: "05-03-2024 19:04:12",
        updatedTime: "05-03-2024 19:04:12",
        username: "trilephan"
    });
    
    await schedule45.save();
    
    let schedule46 = new Schedule({
        scheduleId: "05032024190373",
        time: "21/04/2024",
        activity: "Khám sức khỏe định kỳ",
        purpose: "Kiểm tra sức khỏe định kỳ cho Frankie",
        contact: "Bệnh viện thú y PetLife",
        note: "Kiểm tra định kỳ, chú ý tới vấn đề hô hấp",
        result: "Frankie cần được theo dõi thêm về hệ hô hấp",
        createdTime: "05-03-2024 19:04:13",
        updatedTime: "05-03-2024 19:04:13",
        username: "khacnghiem123"
    });
    
    await schedule46.save();
    
    let schedule47 = new Schedule({
        scheduleId: "05032024190374",
        time: "22/04/2024",
        activity: "Dịch vụ làm đẹp",
        purpose: "Làm đẹp và chăm sóc lông cho Lola",
        contact: "Salon thú cưng PetLuxury",
        note: "Làm sạch, tắm spa và cắt tỉa lông",
        result: "Lola trông sạch sẽ và đẹp mắt",
        createdTime: "05-03-2024 19:04:14",
        updatedTime: "05-03-2024 19:04:14",
        username: "ltqn1692"
    });
    
    await schedule47.save();
    
    let schedule48 = new Schedule({
        scheduleId: "05032024190375",
        time: "23/04/2024",
        activity: "Thăm khám sức khỏe",
        purpose: "Kiểm tra sức khỏe tổng quát cho Bruno",
        contact: "Bệnh viện thú y PetCare Plus",
        note: "Kiểm tra sức khỏe định kỳ, bao gồm tim mạch và huyết học",
        result: "Bruno khỏe mạnh, không có vấn đề gì",
        createdTime: "05-03-2024 19:04:15",
        updatedTime: "05-03-2024 19:04:15",
        username: "baobinht2"
    });
    
    await schedule48.save();
    
    let schedule49 = new Schedule({
        scheduleId: "05032024190376",
        time: "24/04/2024",
        activity: "Dịch vụ làm đẹp",
        purpose: "Làm đẹp toàn diện cho Nala",
        contact: "Salon làm đẹp PetChic",
        note: "Làm đẹp toàn diện bao gồm cắt tỉa lông và tắm spa",
        result: "Nala trông sạch sẽ và gọn gàng hơn",
        createdTime: "05-03-2024 19:04:16",
        updatedTime: "05-03-2024 19:04:16",
        username: "nguimethucung"
    });
    
    await schedule49.save();
    
    let schedule50 = new Schedule({
        scheduleId: "05032024190377",
        time: "25/04/2024",
        activity: "Khám sức khỏe định kỳ",
        purpose: "Kiểm tra sức khỏe định kỳ cho Gizmo",
        contact: "Trung tâm y tế động vật HealthyPaws",
        note: "Kiểm tra sức khỏe tổng quát, chú ý đến hệ tiêu hóa và da",
        result: "Gizmo cần điều chỉnh chế độ ăn để cải thiện sức khỏe tiêu hóa",
        createdTime: "05-03-2024 19:04:17",
        updatedTime: "05-03-2024 19:04:17",
        username: "nhatbinhmapcutie"
    });
    
    await schedule50.save();

    let schedule51 = new Schedule({
        scheduleId: "05032024190378",
        time: "26/04/2024",
        activity: "Thăm khám sức khỏe",
        purpose: "Kiểm tra sức khỏe tổng quát cho Jasper",
        contact: "Bệnh viện thú y PetVet Care",
        note: "Kiểm tra sức khỏe tổng quát, bao gồm kiểm tra mắt và tai",
        result: "Jasper cần chăm sóc đặc biệt cho mắt và tai do dấu hiệu viêm",
        createdTime: "05-03-2024 19:04:18",
        updatedTime: "05-03-2024 19:04:18",
        username: "duongpham"
    });
    
    await schedule51.save();
    
    let schedule52 = new Schedule({
        scheduleId: "05032024190379",
        time: "27/04/2024",
        activity: "Dịch vụ làm đẹp",
        purpose: "Làm đẹp toàn diện cho Frankie",
        contact: "Salon làm đẹp PetElite",
        note: "Làm đẹp toàn diện bao gồm cắt tỉa lông và tắm spa",
        result: "Frankie trông sạch sẽ và gọn gàng hơn",
        createdTime: "05-03-2024 19:04:19",
        updatedTime: "05-03-2024 19:04:19",
        username: "soulknight"
    });
    
    await schedule52.save();
    
    let schedule53 = new Schedule({
        scheduleId: "05032024190380",
        time: "28/04/2024",
        activity: "Khám sức khỏe định kỳ",
        purpose: "Kiểm tra sức khỏe định kỳ cho Lola",
        contact: "Trung tâm y tế PetHealth",
        note: "Kiểm tra sức khỏe định kỳ, bao gồm tim mạch và hô hấp",
        result: "Lola khỏe mạnh, không có vấn đề gì",
        createdTime: "05-03-2024 19:04:20",
        updatedTime: "05-03-2024 19:04:20",
        username: "phatongtan"
    });
    
    await schedule53.save();
    
    let schedule54 = new Schedule({
        scheduleId: "05032024190381",
        time: "29/04/2024",
        activity: "Dịch vụ làm đẹp",
        purpose: "Spa và làm đẹp cho Bruno",
        contact: "Salon thú cưng LuxuryPaws",
        note: "Spa thư giãn và cắt tỉa lông",
        result: "Bruno trông sạch sẽ và tươi mới",
        createdTime: "05-03-2024 19:04:21",
        updatedTime: "05-03-2024 19:04:21",
        username: "haidongle"
    });
    
    await schedule54.save();
    
    let schedule55 = new Schedule({
        scheduleId: "05032024190382",
        time: "30/04/2024",
        activity: "Thăm khám sức khỏe",
        purpose: "Kiểm tra sức khỏe tổng quát cho Piper",
        contact: "Phòng khám thú y VetCare",
        note: "Kiểm tra sức khỏe tổng quát, bao gồm tim mạch và kiểm tra huyết học",
        result: "Piper khỏe mạnh, không có vấn đề gì",
        createdTime: "05-03-2024 19:04:22",
        updatedTime: "05-03-2024 19:04:22",
        username: "trilephan"
    });
    
    await schedule55.save();

    let schedule56 = new Schedule({
        scheduleId: "05032024190383",
        time: "01/05/2024",
        activity: "Khám sức khỏe định kỳ",
        purpose: "Kiểm tra sức khỏe định kỳ cho Gizmo",
        contact: "Bệnh viện thú y PetHealth",
        note: "Kiểm tra sức khỏe định kỳ, bao gồm tim mạch và hô hấp",
        result: "Gizmo khỏe mạnh, không có vấn đề gì",
        createdTime: "05-03-2024 19:04:23",
        updatedTime: "05-03-2024 19:04:23",
        username: "menot123"
    });
    
    await schedule56.save();
    
    let schedule57 = new Schedule({
        scheduleId: "05032024190384",
        time: "02/05/2024",
        activity: "Dịch vụ làm đẹp",
        purpose: "Spa và làm đẹp cho Jasper",
        contact: "Salon thú cưng PetGlamour",
        note: "Spa thư giãn và cắt tỉa lông",
        result: "Jasper trông sạch sẽ và tươi mới",
        createdTime: "05-03-2024 19:04:24",
        updatedTime: "05-03-2024 19:04:24",
        username: "baobinht2"
    });
    
    await schedule57.save();
    
    let schedule58 = new Schedule({
        scheduleId: "05032024190385",
        time: "03/05/2024",
        activity: "Thăm khám sức khỏe",
        purpose: "Kiểm tra sức khỏe tổng quát cho Zelda",
        contact: "Bệnh viện thú y PetVet Care",
        note: "Kiểm tra sức khỏe tổng quát, bao gồm kiểm tra mắt và tai",
        result: "Zelda cần chăm sóc đặc biệt cho mắt và tai do dấu hiệu viêm",
        createdTime: "05-03-2024 19:04:25",
        updatedTime: "05-03-2024 19:04:25",
        username: "duongpham"
    });
    
    await schedule58.save();
    
    let schedule59 = new Schedule({
        scheduleId: "05032024190386",
        time: "04/05/2024",
        activity: "Khám sức khỏe định kỳ",
        purpose: "Kiểm tra sức khỏe định kỳ cho Milo (Chó)",
        contact: "Trung tâm y tế PetHealth",
        note: "Kiểm tra sức khỏe định kỳ, bao gồm tim mạch và hô hấp",
        result: "Milo khỏe mạnh, không có vấn đề gì",
        createdTime: "05-03-2024 19:04:26",
        updatedTime: "05-03-2024 19:04:26",
        username: "nghiemngayngan"
    });
    
    await schedule59.save();
    
    let schedule60 = new Schedule({
        scheduleId: "05032024190387",
        time: "05/05/2024",
        activity: "Dịch vụ làm đẹp",
        purpose: "Làm đẹp và chăm sóc lông cho Piper",
        contact: "Salon làm đẹp PetElite",
        note: "Làm đẹp toàn diện bao gồm cắt tỉa lông và tắm spa",
        result: "Piper trông sạch sẽ và gọn gàng hơn",
        createdTime: "05-03-2024 19:04:27",
        updatedTime: "05-03-2024 19:04:27",
        username: "khacnghiem123"
    });
    
    await schedule60.save();

    let schedule61 = new Schedule({
        scheduleId: "05032024190388",
        time: "06/05/2024",
        activity: "Thăm khám sức khỏe",
        purpose: "Kiểm tra sức khỏe tổng quát cho Frankie",
        contact: "Bệnh viện thú y PetCare Plus",
        note: "Kiểm tra sức khỏe định kỳ, bao gồm tim mạch và chức năng thận",
        result: "Frankie khỏe mạnh, không có vấn đề gì",
        createdTime: "05-03-2024 19:04:28",
        updatedTime: "05-03-2024 19:04:28",
        username: "ltqn1692"
    });
    
    await schedule61.save();
    
    let schedule62 = new Schedule({
        scheduleId: "05032024190389",
        time: "07/05/2024",
        activity: "Dịch vụ làm đẹp",
        purpose: "Làm đẹp toàn diện cho Lola",
        contact: "Salon làm đẹp PetElite",
        note: "Làm đẹp toàn diện bao gồm cắt tỉa lông và tắm spa",
        result: "Lola trông sạch sẽ và gọn gàng hơn",
        createdTime: "05-03-2024 19:04:29",
        updatedTime: "05-03-2024 19:04:29",
        username: "nhatbinhmapcutie"
    });
    
    await schedule62.save();
    
    let schedule63 = new Schedule({
        scheduleId: "05032024190390",
        time: "08/05/2024",
        activity: "Khám sức khỏe định kỳ",
        purpose: "Kiểm tra sức khỏe định kỳ cho Bruno",
        contact: "Trung tâm y tế động vật HealthyPaws",
        note: "Kiểm tra sức khỏe tổng quát, chú ý đến hệ tiêu hóa và da",
        result: "Bruno cần điều chỉnh chế độ ăn để cải thiện sức khỏe tiêu hóa",
        createdTime: "05-03-2024 19:04:30",
        updatedTime: "05-03-2024 19:04:30",
        username: "duongpham"
    });
    
    await schedule63.save();
    
    let schedule64 = new Schedule({
        scheduleId: "05032024190391",
        time: "09/05/2024",
        activity: "Dịch vụ làm đẹp",
        purpose: "Spa và làm đẹp cho Nala",
        contact: "Salon thú cưng LuxuryPaws",
        note: "Tắm spa và chăm sóc da đặc biệt cho da nhạy cảm",
        result: "Nala cảm thấy thoải mái và da khỏe mạnh hơn",
        createdTime: "05-03-2024 19:04:31",
        updatedTime: "05-03-2024 19:04:31",
        username: "kebian6931"
    });
    
    await schedule64.save();
    
    let schedule65 = new Schedule({
        scheduleId: "05032024190392",
        time: "10/05/2024",
        activity: "Thăm khám sức khỏe",
        purpose: "Kiểm tra sức khỏe tổng quát cho Bella (Border Collie)",
        contact: "Bệnh viện thú cưng FourPaws",
        note: "Kiểm tra sức khỏe tổng quát, chú ý đến hệ tiêu hóa",
        result: "Bella khỏe mạnh, không có vấn đề gì",
        createdTime: "05-03-2024 19:04:32",
        updatedTime: "05-03-2024 19:04:32",
        username: "ltqn1692"
    });
    
    await schedule65.save();
}

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
    const { page = 1, limit = 2, search } = req.query;

    let query = { username: req.session.username };
    if (search) {
        query.activity = { $regex: search, $options: 'i' };
    }

    const schedules = await Schedule.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .lean();

    const count = await Schedule.countDocuments(query);
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

    res.render('schedule', {
        title: 'Ghi lịch trình y tế',
        username: req.session.username,
        fullname: req.session.fullname,
        profilePicture: req.session.profilePicture,
        schedules: schedules,
        totalPages,
        firstPage,
        currentPage,
        pages,
        previousPage,
        finalPage,
        nextPage,
        search
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

    let currentDate = new Date();
    let generateId = `${currentDate.getDate().toString().padStart(2, '0')}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getFullYear()}${currentDate.getHours().toString().padStart(2, '0')}${currentDate.getMinutes().toString().padStart(2, '0')}${currentDate.getSeconds().toString().padStart(2, '0')}`;
    let createdAndUpdatedTime = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;

    let schedule = new Schedule({
        scheduleId: generateId,
        time: formatDate(req.body.time),
        activity: req.body.activity,
        purpose: req.body.purpose,
        contact: req.body.contact,
        note: req.body.note,
        result: req.body.result,
        createdTime: createdAndUpdatedTime,
        updatedTime: createdAndUpdatedTime,
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

async function updateSchedule(req, res) {
    const { scheduleId, time, activity, purpose, contact, note, result } = req.body;
    
    if (!scheduleId || !time || !activity || !purpose || !contact || !note || !result) {
        req.flash("error", "Vui lòng không bỏ trống thông tin");
        return res.redirect("/schedule");
    }

    let updatedTime = `${new Date().getDate().toString().padStart(2, '0')}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getFullYear()} ${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}:${new Date().getSeconds().toString().padStart(2, '0')}`;

    try {
        const updatedSchedule = await Schedule.findOneAndUpdate(
            { scheduleId: scheduleId },
            {
                $set: {
                    time: formatDate(time),
                    activity: activity,
                    purpose: purpose,
                    contact: contact,
                    note: note,
                    result: result,
                    updatedTime: updatedTime
                }
            },
            { new: true } 
        );

        if (updatedSchedule) {
            req.flash("success", "Cập nhật lịch trình y tế thành công");
            res.redirect("/schedule");
        } else {
            req.flash("error", "Lịch trình y tế không tồn tại");
            res.redirect("/schedule");
        }
    } catch (error) {
        console.error("Error updating schedule:", error);
        req.flash("error", "Không thể cập nhật lịch trình y tế");
        res.redirect("/schedule");
    }
}

async function removeSchedule(req, res) {
    try {
        const scheduleId = req.body.scheduleId;
        const deletedSchedule = await Schedule.findOneAndDelete({ scheduleId: scheduleId });
        if (deletedSchedule) {
            req.flash("success", "Xóa lịch trình y tế thành công");
            res.redirect('/schedule');
        } else {
            req.flash("error", "Không thể xóa lịch trình y tế. Lịch trình y tế không tồn tại.");
            res.redirect('/schedule');
        }
    } catch (error) {
        req.flash("error", "Xóa lịch trình y tế thất bại");
        res.redirect('/schedule');
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
    initData,
    getMedicalPage,
    getSchedulePage,
    getHealthPage,
    getPetProfileByPetId,
    addPet,
    updatePetProfile,
    removePet,
    addSchedule,
    updateSchedule,
    removeSchedule,
    addNotification,
    editNotification,
    removeNotification,
    changePetPicture,
};
// medical.js
let selectedDate = null;

document.addEventListener('DOMContentLoaded', function() {
    let previousSelectedDay = null;

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Lấy phần tử DOM cần thiết
    const prevMonthButton = document.querySelector('.prev-month');
    const nextMonthButton = document.querySelector('.next-month');
    const monthYearText = document.querySelector('.month-year-text');
    const calendarDaysContainer = document.querySelector('.calendar-days');

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    // Hàm để tạo và cập nhật lịch
    function updateCalendar(month, year) {
        calendarDaysContainer.innerHTML = ''; // Xóa ngày cũ
        // Đặt tiêu đề cho tháng và năm
        monthYearText.textContent = `${monthNames[month]} ${year}`;

        // Tính số ngày trong tháng
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Tìm ngày đầu tiên của tháng
        const firstDayOfMonth = new Date(year, month, 1).getDay();

        // Thêm khoảng trắng cho những ngày đầu tuần nếu cần
        for (let i = 0; i < firstDayOfMonth; i++) {
            const spacer = document.createElement('div');
            spacer.classList.add('calendar-day');
            calendarDaysContainer.appendChild(spacer);
        }

        // Lấy ngày hiện tại để so sánh và làm nổi bật
        const today = new Date();
        const todayDate = today.getDate();
        const todayMonth = today.getMonth();
        const todayYear = today.getFullYear();

        // Tạo và thêm ngày vào lịch
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            dayElement.textContent = day;
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            dayElement.setAttribute('data-date', dateString);
            // Nếu là tháng và năm hiện tại, kiểm tra ngày và làm nổi bật ngày hôm nay
            if (day === todayDate && month === todayMonth && year === todayYear) {
                dayElement.classList.add('today');
            }
            calendarDaysContainer.appendChild(dayElement);
        }

        const dayElements = document.querySelectorAll('.calendar-day');
        dayElements.forEach(dayElement => {
            dayElement.addEventListener('click', function() {
                const selectedDate = dayElement.getAttribute('data-date');
                displayNotifications(selectedDate);
            });
        });
    }

    // Hàm để di chuyển lịch về ngày hiện tại
    function goToToday() {
        currentDate = new Date();
        currentMonth = currentDate.getMonth();
        currentYear = currentDate.getFullYear();
        updateCalendar(currentMonth, currentYear);
    }

    // Sự kiện khi nhấp vào nút tháng trước
    prevMonthButton.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar(currentMonth, currentYear);
        addNotificationsToCalendar();
    });

    // Sự kiện khi nhấp vào nút tháng tiếp theo
    nextMonthButton.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar(currentMonth, currentYear);
        addNotificationsToCalendar();
    });

    // Thêm sự kiện cho nút Today
    const todayButton = document.querySelector('.today-button');
    if (todayButton) {
        todayButton.addEventListener('click', function() {
            goToToday();
            addNotificationsToCalendar();
        });
    }

    // Khởi tạo lịch với tháng hiện tại và năm
    updateCalendar(currentMonth, currentYear);
    addNotificationsToCalendar();

    // Sự kiện khi nhấp vào nút Ghi lịch trình
    var ghiLichTrinhButton = document.getElementById("schedule-button");
    if (ghiLichTrinhButton) {
        ghiLichTrinhButton.addEventListener("click", function() {
            // Điều hướng đến route '/schedule' trên server
            window.location.href = '/schedule';
        });
    }

    // MODAL REMINDER
    var btnReminder = document.getElementById("reminder-button");
    var modalReminder = document.getElementById("reminderModal");
    var spanClose = modalReminder.getElementsByClassName("close")[0];
    btnReminder.onclick = function() {
        modalReminder.style.display = "block";
        spanClose.onclick = function() {
            modalReminder.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modalReminder) {
                modalReminder.style.display = "none";
            }
        }
    }

    addNotificationsToCalendar();

    function displayNotifications(date) {
        const notificationBoard = document.getElementById('notificationBoard');
        const notificationBoardContent = document.querySelector('.notification-board-content');
        const selectedDateElement = document.getElementById('selectedDate');
        notificationBoard.style.display = 'block'; // Hiển thị bảng thông báo
        notificationBoardContent.innerHTML = ''; // Xóa nội dung cũ
        selectedDate = date.split("-")[2] + "/" + date.split("-")[1] + "/" + date.split("-")[0]; 
        selectedDateElement.textContent = `${selectedDate}`;

        if (previousSelectedDay) {
            previousSelectedDay.classList.remove('selected-day');
        }

        // Gán lớp CSS selected-day cho ngày được chọn và lưu trữ ngày này
        const dayElement = document.querySelector(`.calendar-day[data-date="${date}"]`);
        dayElement.classList.add('selected-day');
        previousSelectedDay = dayElement;
    
        // Lọc và hiển thị các event tương ứng với ngày đã chọn
        const notificationIds = document.querySelectorAll('.notification-id');
        const notificationDates = document.querySelectorAll('.notification-date');
        const notificationEvents = document.querySelectorAll('.notification-event');
        const eventsList = [];
        
        for (let i = 0; i < notificationDates.length; i++) {
            if (notificationDates[i].textContent === selectedDate) {
                const event = notificationEvents[i].textContent;
                const id = notificationIds[i].textContent;
                eventsList.push({ event, id });
            }
        }
        
        if (eventsList.length > 1) {
            const eventsListElement = document.createElement('ol');
        
            eventsList.forEach((item, index) => {
                const eventItem = document.createElement('li');
                eventItem.textContent = `${item.event}`;
                eventItem.style.position = 'relative';
        
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'x';
                deleteButton.classList.add('btn', 'btn-sm', 'btn-danger');
                deleteButton.style.position = 'absolute';
                deleteButton.style.right = '0';
                deleteButton.style.marginRight = '5px';

                const editButton = document.createElement('button');
                editButton.textContent = 'edit';
                editButton.classList.add('btn', 'btn-sm', 'btn-warning');
                editButton.style.position = 'absolute';
                editButton.style.right = '20px';
                editButton.style.marginRight = '5px';

                var modalUpdate = document.getElementById("updateModal");
                var spanClose = modalUpdate.querySelector(".close");
                
                editButton.addEventListener('click', function() {
                    const notificationId = item.id;
                    const event = item.event;
                    document.getElementById('notificationId').value = notificationId;
                    document.getElementById('newEvent').value = event;
                    modalUpdate.style.display = "block";
                    spanClose.onclick = function() {
                        modalUpdate.style.display = "none";
                    };
                    window.onclick = function(event) {
                        if (event.target == modalUpdate) {
                            modalUpdate.style.display = "none";
                        }
                    };
                });
        
                deleteButton.addEventListener('click', function(event) {
                    event.preventDefault();
                    const eventId = item.id;
                    fetch('/remove-notification', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ notificationId: eventId })
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Đường truyền mạng không ổn định');
                        }
                        window.location.reload();
                    })
                    .catch(error => {
                        console.error('Có lỗi đã xảy ra!', error);
                    });
                });
        
                eventItem.appendChild(deleteButton);
                eventItem.appendChild(editButton);
                eventsListElement.appendChild(eventItem);
        
                // Tăng khoảng cách giữa hai dòng (trừ dòng cuối cùng)
                if (index < eventsList.length - 1) {
                    eventItem.style.marginBottom = '10px';
                }
            });
        
            notificationBoardContent.appendChild(eventsListElement);
        } else if (eventsList.length === 1) {
            const eventItem = document.createElement('div');
            eventItem.textContent = eventsList[0].event;
            eventItem.style.textAlign = 'center';
            eventItem.style.position = 'relative';
        
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'x';
            deleteButton.classList.add('btn', 'btn-sm', 'btn-danger');
            deleteButton.style.position = 'absolute';
            deleteButton.style.right = '0';
            deleteButton.style.marginRight = '5px';

            const editButton = document.createElement('button');
            editButton.textContent = 'edit';
            editButton.classList.add('btn', 'btn-sm', 'btn-warning');
            editButton.style.position = 'absolute';
            editButton.style.right = '20px';
            editButton.style.marginRight = '5px';

            var modalUpdate = document.getElementById("updateModal");
            var spanClose = modalUpdate.querySelector(".close");
            
            editButton.addEventListener('click', function() {
                const notificationId = eventsList[0].id;
                const event = eventsList[0].event;
                document.getElementById('notificationId').value = notificationId;
                document.getElementById('newEvent').value = event;
                modalUpdate.style.display = "block";
                spanClose.onclick = function() {
                    modalUpdate.style.display = "none";
                };
                window.onclick = function(event) {
                    if (event.target == modalUpdate) {
                        modalUpdate.style.display = "none";
                    }
                };
            });
        
            deleteButton.addEventListener('click', function(event) {
                event.preventDefault();
                const eventId = eventsList[0].id;
                fetch('/remove-notification', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ notificationId: eventId })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    window.location.reload();
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
            });            
        
            eventItem.appendChild(deleteButton);
            eventItem.appendChild(editButton);
            notificationBoardContent.appendChild(eventItem);
        } else {
            const noEventMessage = document.createElement('div');
            noEventMessage.textContent = "Hiện không có nhắc nhở nào";
            noEventMessage.style.textAlign = 'center';
            notificationBoardContent.appendChild(noEventMessage);
        }
        
        // Đóng bảng thông báo khi nhấp vào nút đóng
        const closeBtn = document.querySelector('.notification-board-close');
        closeBtn.addEventListener('click', function() {
            notificationBoard.style.display = 'none';
        });
    }
    
    // Thêm sự kiện cho các ngày trên lịch
    const dayElements = document.querySelectorAll('.calendar-day');
    dayElements.forEach(dayElement => {
        dayElement.addEventListener('click', function() {
            const selectedDate = dayElement.getAttribute('data-date');
            displayNotifications(selectedDate);
        });
    });
});

function addNotificationsToCalendar() {
    const notificationElements = document.querySelectorAll('.notification-date');
    notificationElements.forEach(element => {
        const date = element.textContent;
        const selectedDate = date.split('/')[2] + "-" + date.split('/')[1] + "-" + date.split('/')[0];
        addReminderToCalendar(selectedDate);
    });
}

function addReminderToCalendar(date) {
    // Tìm ngày tương ứng trên lịch
    const dayElements = document.querySelectorAll('.calendar-day');
    dayElements.forEach(dayElement => {
        if (dayElement.getAttribute('data-date') === date) {
            // Kiểm tra xem biểu tượng nhắc nhở đã tồn tại chưa
            const existingIcon = dayElement.querySelector('.reminder');
            if (!existingIcon) {
                // Nếu không tồn tại, tạo và thêm biểu tượng nhắc nhở
                const icon = document.createElement('img');
                icon.src = '/img/reminder.png';
                icon.alt = 'Reminder';
                icon.classList.add('reminder');
                dayElement.appendChild(icon);
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const alert = document.querySelector('.alert');
    if (alert) {
        setTimeout(function() {
            alert.classList.add('hide');
        }, 3000);
    }
});
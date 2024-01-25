// medical.js
let selectedDate = null;

document.addEventListener('DOMContentLoaded', function() {
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
    });

    // Sự kiện khi nhấp vào nút tháng tiếp theo
    nextMonthButton.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar(currentMonth, currentYear);
    });

    // Thêm sự kiện cho nút Today
    const todayButton = document.querySelector('.today-button');
    if (todayButton) {
        todayButton.addEventListener('click', goToToday);
    }

    // Khởi tạo lịch với tháng hiện tại và năm
    updateCalendar(currentMonth, currentYear);

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
});

document.getElementById('reminder-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn không cho form thực hiện submit theo cách thông thường

    // Lấy giá trị ngày tháng từ input và chuyển đến định dạng yyyy-mm-dd
    var dateTime = document.getElementById('time').value;
    selectedDate = new Date(dateTime).toISOString().split('T')[0];

    // Thêm biểu tượng nhắc nhở vào lịch
    addReminderToCalendar(selectedDate);

    // Đóng modal nhắc nhở
    modalReminder.style.display = "none";

    function addReminderToCalendar(date) {
        // Tìm ngày tương ứng trên lịch
        const dayElements = document.querySelectorAll('.calendar-day');
        dayElements.forEach(dayElement => {
            if (dayElement.getAttribute('data-date') === date) {
                // Tạo và thêm biểu tượng nhắc nhở
                const icon = document.createElement('img');
                icon.src = '/img/reminder.png';
                icon.alt = 'Reminder';
                icon.classList.add('reminder');
                dayElement.appendChild(icon);
            }
        });
    }
});
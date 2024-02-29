function sendScheduleMail(username, time, activity) {
    fetch("/send-schedule-mail", {
            method: "post",
            body: new URLSearchParams({
                'username': username,
                'time': time,
                'activity': activity
            })
        })
        .then(() => showCustomToast("Gửi email thành công", "Thông báo"))
}

function showCustomToast(message, title) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.classList.add('toast-message', 'toast-show');
    toast.innerHTML = `<strong>${title}</strong><p>${message}</p>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('toast-show');
        toast.addEventListener('transitionend', function() {
            container.removeChild(toast);
        }, { once: true });
    }, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
    var deleteButtons = document.querySelectorAll('.deleteScheduleModalToggle');
    var scheduleIdInput = document.getElementById('scheduleId');

    deleteButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var scheduleId = btn.getAttribute('data-schedule-id');
            scheduleIdInput.value = scheduleId;
        });
    });
});
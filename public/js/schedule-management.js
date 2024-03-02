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

function setScheduleId(scheduleId) {
    document.getElementById('deleteScheduleForm').setAttribute('data-schedule-id', scheduleId);
}

document.getElementById('confirmDelete').addEventListener('click', function() {
    const scheduleId = document.getElementById('deleteScheduleForm').getAttribute('data-schedule-id');
    
    fetch(`/delete-schedule-management`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ scheduleId: scheduleId }),
    })
    .then(() => {
        window.location.reload(); 
        $('#deleteScheduleModal').modal('hide');
    })
});
function lockUser(username) {
    fetch("/lock-user", {
            method: "put",
            body: JSON.stringify({
                username: username
            }),
            headers: {
                'Content-type': "application/json"
            }
        })
        .then(() => location.reload())
}

function sendNotificationMail(username, date, event) {
    fetch("/send-notification-mail", {
            method: "post",
            body: new URLSearchParams({
                'username': username,
                'date': date,
                'event': event
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

function setNotificationId(notificationId) {
    document.getElementById('deleteNotificationForm').setAttribute('data-notification-id', notificationId);
}

document.getElementById('confirmDelete').addEventListener('click', function() {
    const notificationId = document.getElementById('deleteNotificationForm').getAttribute('data-notification-id');
    
    fetch(`/delete-notification`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notificationId: notificationId }),
    })
    .then(() => {
        window.location.reload(); 
        console.log(notificationId)
        $('#deleteNotificationModal').modal('hide');
    })
});
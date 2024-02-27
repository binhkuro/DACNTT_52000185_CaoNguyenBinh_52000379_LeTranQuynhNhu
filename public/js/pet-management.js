function sendMail(username, name) {
    fetch("/send-mail", {
            method: "post",
            body: new URLSearchParams({
                'username': username,
                'name': name
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
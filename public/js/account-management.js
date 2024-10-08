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

function sendEmail(email) { 
    fetch("/send-email", {
            method: "post",
            body: new URLSearchParams({
                'email': email
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

function setAccountId(username) {
    document.getElementById('deleteAccountForm').setAttribute('data-account-id', username);
}

document.getElementById('confirmDelete').addEventListener('click', function() {
    const username = document.getElementById('deleteAccountForm').getAttribute('data-account-id');
    
    fetch(`/delete-account`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username }),
    })
    .then(() => {
        window.location.reload(); 
        $('#deleteAccountModal').modal('hide');
    })
});
document.getElementById("togglePassword1").addEventListener("click", function() {
    var passwordInput = document.getElementById("currentPassword");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        this.classList.remove("fa-eye");
        this.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        this.classList.remove("fa-eye-slash");
        this.classList.add("fa-eye");
    }
});

document.getElementById("togglePassword2").addEventListener("click", function() {
    var passwordInput = document.getElementById("newPassword");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        this.classList.remove("fa-eye");
        this.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        this.classList.remove("fa-eye-slash");
        this.classList.add("fa-eye");
    }
});

document.getElementById("togglePassword3").addEventListener("click", function() {
    var passwordInput = document.getElementById("confirmPassword");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        this.classList.remove("fa-eye");
        this.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        this.classList.remove("fa-eye-slash");
        this.classList.add("fa-eye");
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const alert = document.querySelector('.alert');
    if (alert) {
        setTimeout(function() {
            alert.classList.add('hide');
        }, 3000);
    }
});
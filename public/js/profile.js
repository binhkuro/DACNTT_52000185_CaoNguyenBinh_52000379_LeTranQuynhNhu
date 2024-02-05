let file = document.getElementById("file");
let btnChooseFile = document.getElementById("btnChooseFile");
let submit = document.getElementById("submit");

btnChooseFile.addEventListener("click", () => {
    file.click();
})

// Upload ảnh lên server sau khi chọn file
file.addEventListener("change", () => {
    submit.click();
})

document.addEventListener("DOMContentLoaded", function() {
    var profilePicture = document.getElementById("profilePicture");
    if (profilePicture.src.endsWith("default-avatar.png")) {
        var btnRemovePicture = document.getElementById("btnRemovePicture");
        btnRemovePicture.style.display = "none";
    }
});

document.addEventListener('DOMContentLoaded', (event) => {
    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');
    
    togglePassword.addEventListener('click', () => {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type); 
        
        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-eye-slash');
    });

    const toggleOldPassword = document.querySelector('#toggleOldPassword');
    const currentPassword = document.querySelector('#currentPassword');
    
    toggleOldPassword.addEventListener('click', () => {
        const type = currentPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        currentPassword.setAttribute('type', type);
        toggleOldPassword.classList.toggle('fa-eye');
        toggleOldPassword.classList.toggle('fa-eye-slash');
    });

    const toggleNewPassword = document.querySelector('#toggleNewPassword');
    const newPassword = document.querySelector('#newPassword');
    
    toggleNewPassword.addEventListener('click', () => {
        const type = newPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        newPassword.setAttribute('type', type);
        toggleNewPassword.classList.toggle('fa-eye');
        toggleNewPassword.classList.toggle('fa-eye-slash');
    });

    const toggleConfirmPassword = document.querySelector('#toggleConfirmPassword');
    const confirmPassword = document.querySelector('#confirmPassword');
    
    toggleConfirmPassword.addEventListener('click', () => {
        const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPassword.setAttribute('type', type);
        toggleConfirmPassword.classList.toggle('fa-eye');
        toggleConfirmPassword.classList.toggle('fa-eye-slash');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const alert = document.querySelector('.alert');
    if (alert) {
        setTimeout(function() {
            alert.classList.add('hide');
        }, 3000);
    }
});

$(document).ready(function() {
    $('#editFullnameModalToggle').on('click', function() {
        $('#editFullnameModal').modal('show');
    });
});

$(document).ready(function() {
    $('#editAddressModalToggle').on('click', function() {
        $('#editAddressModal').modal('show');
    });
});

$(document).ready(function() {
    $('#editPhoneNumberModalToggle').on('click', function() {
        $('#editPhoneNumberModal').modal('show');
    });
});

$('#updateProfileModalToggle').on('click', function() {
    $('#updateProfileModal').modal('show');
});

$('#updatePasswordModalToggle').on('click', function() {
    $('#updatePasswordModal').modal('show');
});
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

document.addEventListener('DOMContentLoaded', (event) => {
    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');
    
    togglePassword.addEventListener('click', () => {
        // Check if password is currently visible
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type); // Switches the type attribute
        
        // Toggle the eye/eye-slash icon
        togglePassword.classList.toggle('fa-eye-slash');
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

    $('#saveFullname').on('click', function() {
        var newFullname = $('#newFullname').val();
        $.ajax({
            url: '/update-fullname',
            type: 'post',
            data: { fullname: newFullname },
            success: function(response) {
                $('#fullname').val(response.fullname);
                $('#editFullnameModal').modal('hide');
                displayFlashMessage('success', response.message);
            },
            error: function(error) {
                displayFlashMessage('error', error.responseText);
            }
        });
    });
});

function displayFlashMessage(type, message) {
    var flashMessageDiv = $('<div></div>')
        .addClass('alert')
        .addClass(type === 'success' ? 'alert-success' : 'alert-danger')
        .text(message);

    $('.alert').remove();

    $(flashMessageDiv).insertAfter('.header-container');

    window.scrollTo(0, 0);

    setTimeout(function() {
        flashMessageDiv.remove();
    }, 3000);
}
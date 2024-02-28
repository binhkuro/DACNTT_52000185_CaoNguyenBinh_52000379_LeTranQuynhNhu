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

document.addEventListener('DOMContentLoaded', function() {
    const alert = document.querySelector('.alert');
    if (alert) {
        setTimeout(function() {
            alert.classList.add('hide');
        }, 3000);
    }
});

$(document).ready(function() {
    $('#updatePetProfileModalToggle').on('click', function() {
        $('#updatePetProfileModal').modal('show');
    });
});
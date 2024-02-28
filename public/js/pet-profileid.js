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
    document.querySelectorAll('.btn-outline-dark').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.closest('.input-group').querySelector('input, select');
            input.removeAttribute('readonly');
            input.removeAttribute('disabled');
            input.focus();
        });
    });

    document.getElementById('updatePasswordModalToggle').addEventListener('click', function() {
        const petId = document.getElementById('petId').value;
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const type = document.getElementById('type').value;
        const species = document.getElementById('species').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const color = document.getElementById('color').value;
        const special = document.getElementById('special').value;

        fetch(`/update-pet-profile:${petId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ petId, name, age, type, species, gender, color, special }),
        })
        .then(() => showCustomToast("Cập nhật thành công", "Thông báo"))
    });
});

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
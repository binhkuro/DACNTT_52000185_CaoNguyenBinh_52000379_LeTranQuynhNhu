document.addEventListener('DOMContentLoaded', function() {
    var btnHealth = document.querySelector(".add-button");
    var modalHealth = document.getElementById("healthModal");
    var spanClose1 = modalHealth.querySelector(".close");
    btnHealth.onclick = function() {
        modalHealth.style.display = "block";
        spanClose1.onclick = function() {
            modalHealth.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modalHealth) {
                modalHealth.style.display = "none";
            }
        }
    }

    document.querySelectorAll(".delete-button").forEach(function(btnDelete) {
        btnDelete.addEventListener('click', function() {
            var card = this.closest('.card'); // Tìm card gần nhất
            var petId = card.querySelector('.card-body[hidden] .card-title').innerText.trim();
            document.getElementById('modalPetId').value = petId;

            var modalDelete = document.getElementById("deleteModal");
            modalDelete.style.display = "block"; 

            var spanClose2 = modalDelete.querySelector(".close");
            spanClose2.onclick = function() {
                modalDelete.style.display = "none";
            }
        });
    });

    window.onclick = function(event) {
        var modalDelete = document.getElementById("deleteModal");
        if (event.target == modalDelete) {
            modalDelete.style.display = "none";
        }
    }
});

const deleteButtons = document.querySelectorAll('.delete-button');

deleteButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        console.log('Nút thùng rác được nhấp!');
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const selectType = document.querySelector('select[name="type"]');
    selectType.addEventListener('change', function() {
        this.form.submit();
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
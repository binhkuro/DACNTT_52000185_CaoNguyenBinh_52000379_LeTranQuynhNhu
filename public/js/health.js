document.addEventListener('DOMContentLoaded', function() {
    var btnHealth = document.querySelector(".add-button");
    var modalHealth = document.getElementById("healthModal");
    var spanClose = modalHealth.getElementsByClassName("close")[0];
    btnHealth.onclick = function() {
        modalHealth.style.display = "block";
        spanClose.onclick = function() {
            modalHealth.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modalHealth) {
                modalHealth.style.display = "none";
            }
        }
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const selectType = document.querySelector('select[name="type"]');
    selectType.addEventListener('change', function() {
        // Gửi biểu mẫu tự động khi loại thú cưng được thay đổi
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
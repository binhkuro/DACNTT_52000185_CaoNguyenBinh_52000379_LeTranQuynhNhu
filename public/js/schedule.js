document.addEventListener('DOMContentLoaded', function() {
    // MODAL SCHEDULE
    var btnSchedule = document.querySelector(".add-button");
    var modalSchedule = document.getElementById("scheduleModal");
    var spanClose = modalSchedule.getElementsByClassName("close")[0];
    btnSchedule.onclick = function() {
        modalSchedule.style.display = "block";
        spanClose.onclick = function() {
            modalSchedule.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modalSchedule) {
                modalSchedule.style.display = "none";
            }
        }
    }
});
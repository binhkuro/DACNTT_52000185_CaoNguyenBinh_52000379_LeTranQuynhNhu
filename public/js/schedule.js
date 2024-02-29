function formatDateToDDMMYYYY(isoString) {
    const [day, month, year] = isoString.split("/");
    return `${year}-${month}-${day}`;
}

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

    var updateButtons = document.querySelectorAll(".update-button");
    updateButtons.forEach(function(button) {
        button.onclick = function() {
            var scheduleId = this.getAttribute("data-schedule-id");
            var activity = this.getAttribute("data-schedule-activity");
            var purpose = this.getAttribute("data-schedule-purpose");
            var time = formatDateToDDMMYYYY(this.getAttribute("data-schedule-time"));
            var contact = this.getAttribute("data-schedule-contact");
            var note = this.getAttribute("data-schedule-note");
            var result = this.getAttribute("data-schedule-result");
    
            var modal = document.getElementById("updateModal");
    
            var inputScheduleId = modal.querySelector("#scheduleId");
            var inputActivity = modal.querySelector("#newActivity");
            var inputPurpose = modal.querySelector("#newPurpose");
            var inputTime = modal.querySelector("#newTime");
            var inputContact = modal.querySelector("#newContact");
            var inputNote = modal.querySelector("#newNote");
            var inputResult = modal.querySelector("#newResult");
    
            inputScheduleId.value = scheduleId;
            inputActivity.value = activity;
            inputPurpose.value = purpose;
            inputTime.value = time;
            console.log(time); 
            inputContact.value = contact;
            inputNote.value = note;
            inputResult.value = result;
    
            modal.style.display = "block";
        }
    });

    var spanClose2 = document.getElementsByClassName("close2")[0];
    spanClose2.onclick = function() {
        var modal = document.getElementById("updateModal");
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        var modal = document.getElementById("updateModal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    var deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach(function(button) {
        button.onclick = function() {
            var scheduleId = this.getAttribute("data-schedule-id");
            var modal = document.getElementById("deleteModal");
            var inputScheduleId = modal.querySelector("#scheduleId");
            inputScheduleId.value = scheduleId;
            modal.style.display = "block";
        }
    });

    var spanClose3 = document.getElementsByClassName("close3")[0];
    spanClose3.onclick = function() {
        var modal = document.getElementById("deleteModal");
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        var modal = document.getElementById("deleteModal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
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
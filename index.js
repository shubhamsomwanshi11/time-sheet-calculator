var code = '';
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function GenerateElements() {
    code = ''
    for (let i = 0; i < daysOfWeek.length; i++) {
        code += `<tr class="is-flex-desktop">
            <td id="day" name="Day :" style="width: 15% !;" class="has-text-weight-bold is-flex is-justify-content-center">${daysOfWeek[i]}</td>
            <td name="Starting :" style="width: 28% !important;" class="is-flex is-flex-wrap-nowrap is-align-content-center">
            <i class="material-icons button is-small is-light mx-1" onclick="removedata('${i}-starting')" id="${i}-starting-remove">remove</i>
            <input type="number" value="00" min="00" max="12" id="${i}-starting-hours" class="input">
            <i class="material-icons button is-small is-light mx-1" onclick="adddata('${i}-starting')" id="${i}-starting-add">add</i>
            <span class="mt-2 mx-1 has-text-weight-bold">:</span>
            <input type="number" value="00" min="00" max="59" id="${i}-starting-minutes" class="input">
            <div class="select mx-2">
            <select name="" id="${i}-starting-time-period">
            <option value="1" id="${i}-starting-am">AM</option>
            <option value="2" id="${i}-starting-pm">PM</option>
            </select>
            </div>
            </td>
            <td name="Ending :" class="is-flex"  style="width: 28% !important;">
            <i class="material-icons  mx-1 button is-small is-light" onclick="removedata('${i}-ending')"  id="${i}-ending-remove">remove</i>
            <input type="number" value="00" min="00" max="12" id="${i}-ending-hours" class="input">
            <i class="material-icons  mx-1  button is-small is-light" onclick="adddata('${i}-ending')" id="${i}-ending-add">add</i>
            <span class="mt-2 mx-1 has-text-weight-bold">:</span>
            <input type="number" value="00" min="00" max="59" id="${i}-ending-minutes" class="input">
            <div class="select mx-2">
        <select name="" id="${i}-ending-time-period" class="select">
        <option value="2" id="${i}-ending-pm">PM</option>
        <option value="1" id="${i}-ending-am">AM</option>
        </select>
        </div>
        </td>
        <td name="Break :" class="is-flex" style="width: 14% !important;">
        <input type="number" value="00" min="00" max="12" id="${i}-break-hours" class="input">
        <span class="mt-2 mx-1 has-text-weight-bold">:</span>
            <input type="number" value="00" min="00" max="59" id="${i}-break-minutes" class="input">
        </td>
        <td name="Total :" class="is-flex is-justify-content-center" style="width: 15% !important;">
        <p id="${i}-total" class="has-text-grey has-text-weight-bold">00:00</p>
        </td>
        </tr>`;
    }
    document.getElementById('table-body').innerHTML = code;
}
var value = 0, flag = 1;;
function Sample(res) {
    for (let i = 0; i < 7; i++) {
        const start_hours = document.getElementById(`${i}-starting-hours`);
        const start_minutes = document.getElementById(`${i}-starting-minutes`);
        const end_hours = document.getElementById(`${i}-ending-hours`);
        const end_minutes = document.getElementById(`${i}-ending-minutes`);
        const break_hours = document.getElementById(`${i}-break-hours`);
        const break_minutes = document.getElementById(`${i}-break-minutes`);
        if (res == 'sample') {
            start_hours.value = Math.floor(Math.random() * 12) + 1;
            start_minutes.value = Math.floor(Math.random() * 59) + 1;
            end_hours.value = Math.floor(Math.random() * 12) + 1;
            end_minutes.value = Math.floor(Math.random() * 59) + 1;
            break_hours.value = Math.floor(Math.random() * 2) + 1;
            break_minutes.value = Math.floor(Math.random() * 40) + 1;
        }
        else if (res != "" ) {
            const timeArray = res.split(":");
            start_hours.value = timeArray[0];;
            start_minutes.value = 00;
            end_hours.value = timeArray[1];
            end_minutes.value = 00;
        }
        var start = document.getElementById("common-start");
        start.addEventListener("input", () => {
            start_hours.value = start.value;
        })
        var end = document.getElementById("common-end")
        end.addEventListener("input", () => {
            end_hours.value = end.value;
        });

        Calculatedata()
    }
}
document.addEventListener("DOMContentLoaded", () => {
    GenerateElements();
    Sample("00:00")
    for (let i = 0; i < 7; i++) {
        const start_hours = document.getElementById(`${i}-starting-hours`);
        const start_minutes = document.getElementById(`${i}-starting-minutes`);
        const start_time_period = document.getElementById(`${i}-starting-time-period`);
        const end_hours = document.getElementById(`${i}-ending-hours`);
        const end_minutes = document.getElementById(`${i}-ending-minutes`);
        const end_time_period = document.getElementById(`${i}-ending-time-period`);
        const break_hours = document.getElementById(`${i}-break-hours`);
        const break_minutes = document.getElementById(`${i}-break-minutes`);
        const startadd = document.getElementById(`${i}-starting-add`);
        const startremove = document.getElementById(`${i}-starting-remove`);
        const endadd = document.getElementById(`${i}-ending-add`);
        const endremove = document.getElementById(`${i}-ending-remove`);
        var btns = [startadd, startremove, endadd, endremove];
        btns.forEach(btn => {
            btn.addEventListener("click", () => { Calculatedata() });
        });
        var inputs = [start_hours, start_time_period, end_time_period, start_minutes, end_hours, end_minutes, break_hours, break_minutes];
        inputs.forEach(input => {
            input.addEventListener("input", () => {
                Calculatedata();
            });
        });

        // listen for changes on any input field
        inputs.forEach(input => {
            input.addEventListener('input', event => {
                const value = event.target.value; // get the value of changed input field
                inputs.forEach(i => {
                    if (i !== input) { // check if the input is not the same as the changed input
                        i.value = value; // assign the same value to other input fields
                    }
                });
            });
        });

    }
});


const startingAddBtn = document.getElementById('0-starting-add');
const startingRemoveBtn = document.getElementById('0-starting-remove');

function adddata(i) {
    var startingHoursInput = document.getElementById(`${i}-hours`);
    var value = parseInt(startingHoursInput.value);
    if (value < 12) {
        value++;
        startingHoursInput.value = value.toString().padStart(2, '0');
    }
}

function removedata(i) {
    var startingHoursInput = document.getElementById(`${i}-hours`);
    let value = parseInt(startingHoursInput.value);
    if (value > 0) {
        value--;
        startingHoursInput.value = value.toString().padStart(2, '0');
    }
}
var flag = 1;

function Calculatedata() {
    let finalminutes = 0, finalhours = 0;

    // Loop through all the days of the week
    for (let i = 0; i < 7; i++) {
        const start_hours = parseInt(document.getElementById(`${i}-starting-hours`).value);
        const start_minutes = parseInt(document.getElementById(`${i}-starting-minutes`).value);
        const start_time_period = document.getElementById(`${i}-starting-time-period`).value;
        const end_hours = parseInt(document.getElementById(`${i}-ending-hours`).value);
        const end_minutes = parseInt(document.getElementById(`${i}-ending-minutes`).value);
        const end_time_period = document.getElementById(`${i}-ending-time-period`).value;
        const break_hours = parseInt(document.getElementById(`${i}-break-hours`).value);
        const break_minutes = parseInt(document.getElementById(`${i}-break-minutes`).value);
        const total = document.getElementById(`${i}-total`);


        if (!isNaN(start_hours) && !isNaN(end_hours) && start_hours && end_hours != "") {
            let hours = 0, minutes = 0;
            // Calculate the total hours and minutes based on the start and end times and the break time
            if (start_time_period == 1 && end_time_period == 2 || start_time_period == 2 && end_time_period == 1) {
                let addend = end_hours + 12;
                hours = addend - start_hours - break_hours;
                minutes = end_minutes - start_minutes - break_minutes;
                if (minutes < 0) {
                    hours = hours - 1;
                    minutes = minutes + 60;
                }
            }
            else if (start_time_period == 1 && end_time_period == 1 || start_time_period == 2 && end_time_period == 2) {
                hours = end_hours - start_hours - break_hours;
                minutes = end_minutes - start_minutes - break_minutes;
                if (minutes < 0) {
                    hours = hours - 1;
                    minutes = minutes + 60;
                }
            }

            if (hours < 0) {
                hours = 00;
            }
            if (minutes < 0) {
                minutes = 00;
            }
            // Update the total time for the current day
            total.innerHTML = `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')}`;

            // Add the current day's hours and minutes to the final total
            finalhours = finalhours + hours;
            finalminutes = finalminutes + minutes;
        }
    }

    // Calculate the final total hours and minutes
    let totalhours = parseInt(finalhours + Math.floor(finalminutes / 60));
    let totalminutes = parseInt(finalminutes % 60);
    if (totalhours < 0) {
        totalhours = 00;
    }
    if (totalminutes < 0) {
        totalminutes = 00;
    }

    // Update the total time for the whole week
    const total_time = document.getElementById('total-time');
    total_time.innerHTML = `${totalhours.toString().padStart(2, '0')}:${totalminutes.toString().padStart(2, '0')}`;
}
// Select all the input elements and span elements for total hours
const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'sunday'];

var total = 0;
// Function to calculate total hours for a given day
function calculateTotal(start, end, breakTime) {
    if (!start || !end) return "0 : 00";

    const startTime = new Date(`01/01/2023 ${start}`);
    const endTime = new Date(`01/01/2023 ${end}`);
    const diff = (endTime - startTime) / (1000 * 60);

    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    const totalMinutes = (hours * 60) + minutes - breakTime;
    if (totalMinutes < 0) {
        return "0 : 00";
    } else {
        const totalHours = Math.floor(totalMinutes / 60);
        const remainingMinutes = totalMinutes % 60;
        const formattedHours = totalHours.toString().padStart(2, '0');
        const formattedMinutes = remainingMinutes.toString().padStart(2, '0');
        return `${formattedHours} : ${formattedMinutes}`;
    }
}

function calculateWeeklyTotal() {
    let weeklyTotalM = 0;
    let weeklyTotalH = 0;
    let hour = 0;
    let minute = 0;
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  
    days.forEach((day) => {
      const total = document.getElementById(`${day}-total`).innerHTML;
      totalarray = total.split(':');
      minute = parseInt(totalarray[1]);
      hour = parseInt(totalarray[0]);
  
      if (!isNaN(minute)) {
        weeklyTotalM = weeklyTotalM + minute;
      }
      if(!isNaN(hour)){
        weeklyTotalH = weeklyTotalH + hour;
      }
    });
  
    // Add leading zeros to the hour and minute values
    const formattedH = weeklyTotalH.toString().padStart(2, '0');
    const formattedM = weeklyTotalM.toString().padStart(2, '0');
  
    return `${formattedH}:${formattedM}`;
  }
  



// Add event listeners to input elements
document.addEventListener("DOMContentLoaded", function () {
    days.forEach(day => {
        const start = document.getElementById(`${day}-start`);
        const end = document.getElementById(`${day}-end`);
        const breakTime = document.getElementById(`${day}-break`);
        const total = document.getElementById(`${day}-total`);

        start.addEventListener("change", function () {
            total.innerText = calculateTotal(start.value, end.value, breakTime.value);
            document.getElementById("weekly-total").innerText = calculateWeeklyTotal();
        });

        end.addEventListener("change", function () {
            total.innerText = calculateTotal(start.value, end.value, breakTime.value);
            document.getElementById("weekly-total").innerText = calculateWeeklyTotal();
        });

        breakTime.addEventListener("change", function () {
            total.innerText = calculateTotal(start.value, end.value, breakTime.value);
            document.getElementById("weekly-total").innerText = calculateWeeklyTotal();
        });
    });

    // Initialize weekly total on page load
    document.getElementById("weekly-total").innerText = calculateWeeklyTotal();

    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    daysOfWeek.forEach(function (day) {
        const dayStart = document.getElementById(`${day}-start`);
        const dayEnd = document.getElementById(`${day}-end`);
        const dayBreak = document.getElementById(`${day}-break`);
        const dayTotal = document.getElementById(`${day}-total`);

        [dayStart, dayEnd, dayBreak].forEach(function (input) {
            input.addEventListener('change', function () {
                calculateTotal(dayStart.value, dayEnd.value, dayBreak.value, dayTotal);
            });
        });
    });
});
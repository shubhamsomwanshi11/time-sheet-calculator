function Calculatedata() {
    let finalminutes = 0, finalhours = 0, finaltotal = 0, hours = 0, minutes = 0;
    for (let i = 0; i < 7; i++) {
        const start_hours = parseInt(document.getElementById(`${i}-starting-hours`).value);
        console.log(start_hours);
        const start_minutes = parseInt(document.getElementById(`${i}-starting-minutes`).value);
        console.log(start_minutes);
        const start_time_period = document.getElementById(`${i}-starting-time-period`).value
        const end_hours = parseInt(document.getElementById(`${i}-ending-hours`).value);
        const end_minutes = parseInt(document.getElementById(`${i}-ending-minutes`).value);
        const end_time_period = document.getElementById(`${i}-ending-time-period`).value
        const break_hours = parseInt(document.getElementById(`${i}-break-hours`).value);
        const break_minutes = parseInt(document.getElementById(`${i}-break-minutes`).value);
        const total = document.getElementById(`${i}-total`)
        const total_time = document.getElementById('total-time')
        if (start_hours != "" && end_hours != "") {
            if (start_time_period == 1 && end_time_period == 2 || start_time_period == 2 && end_time_period == 1) {
                let addend = end_hours + 12
                hours = addend - start_hours - break_hours, minutes = end_minutes - start_minutes - break_minutes
                if (minutes < 0) {
                    hours = hours - 1
                    minutes = minutes + 60
                }
                total.innerHTML = `${hours} : ${minutes}`
                finalhours = finalhours + hours, finalminutes = finalminutes + minutes
                finaltotal = `${finalhours}:${finalminutes}`
                total_time.innerHTML = finaltotal
            }

            else if (start_time_period == 1 && end_time_period == 1 || start_time_period == 2 && end_time_period == 2) {
                hours = end_hours - start_hours - break_hours, minutes = end_minutes - start_minutes - break_minutes
                if (minutes < 0) {
                    hours = hours - 1
                    minutes = minutes + 60
                }
                finalhours = finalhours + hours, finalminutes = finalminutes + minutes
                finaltotal = `${finalhours}:${finalminutes}`
                total_time.innerHTML = finaltotal
                total.innerHTML = `${hours} : ${minutes}`
            }
        }
    }
}
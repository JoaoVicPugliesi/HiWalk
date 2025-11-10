import monthsJSON from "../data/monthsJSON.js";

const placeInfoCalendarMonth = document.querySelector('.place-info-calendar-month');
const placeInfoCalendarMonthPrev = document.querySelector('.place-info-calendar-month-prev');
const placeInfoCalendarMonthNext = document.querySelector('.place-info-calendar-month-next');
const placeInfoCalendarMonthDays = document.querySelector('.place-info-calendar-month-days');

const monthsNavigate = () => {
   let current = 0;
   const data = monthsJSON;
   const renderMonth = () => {
        placeInfoCalendarMonth.textContent = data[current].name;
        placeInfoCalendarMonthDays.innerHTML = '';
        data[current].days.forEach((day) => {
            placeInfoCalendarMonthDays.innerHTML += `
                <div>${day}</div>
            `
        });
   }

   renderMonth();

   placeInfoCalendarMonthNext.addEventListener('click', (e) => {
        e.preventDefault();
        if(current < data.length - 1) {
            current++;
            renderMonth();
        }
   })
   placeInfoCalendarMonthPrev.addEventListener('click', (e) => {
        e.preventDefault();
        if(current > 0) {
            current--;
            renderMonth();
        }
   })
}

export default monthsNavigate;
import monthsJSON from "../data/monthsJSON.js";
import reservePlace from "../place/personal-1-personal-place-reserve.js";

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
                <div class="place-info-calendar-month-days-div">${day}</div>
            `
        });
    }
    
   reservePlace();
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
import activateLink from "./activate-link.js";
import resetLink from "./reset-link.js";

const links = document.querySelectorAll('a');

const gsapLinks = () => {
    links.forEach(link => {

        if (
        link.getAttribute('class') != 'logo' 
        && link.getAttribute('class') != 'prev' 
        && link.getAttribute('class') != 'next' 
        && link.getAttribute('class') != 'place-create-close'
        && link.getAttribute('class') != 'place-info-calendar-month-prev'
        && link.getAttribute('class') != 'place-info-calendar-month-next'
        && link.getAttribute('class') != 'travel-inner-container-icon'
        && link.getAttribute('class') != 'travel-info-inner-container-icon'
        ) {
            link.addEventListener('mousemove', activateLink);
            link.addEventListener('mouseleave', resetLink);
        }
    });
}

export default gsapLinks;
import activateLink from "./activate-link.js";
import resetLink from "./reset-link.js";

const links = document.querySelectorAll('a');

const gsapLinks = () => {
    links.forEach(link => {

        if(link.getAttribute('class') != 'logo') {
            link.addEventListener('mousemove', activateLink);
            link.addEventListener('mouseleave', resetLink);
        }
    });
}

export default gsapLinks;
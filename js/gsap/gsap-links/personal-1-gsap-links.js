import activateLink from "./activate-link.js";
import resetLink from "./reset-link.js";

const gsapLinks = () => {
    const links = document.querySelectorAll('a');
    
    // Classes que devem ser excluídas da animação
    const excludeClasses = [
        'logo',
        'prev',
        'next',
        'place-create-close',
        'place-info-calendar-month-prev',
        'place-info-calendar-month-next',
        'travel-inner-container-icon',
        'travel-info-inner-container-icon'
    ];

    links.forEach(link => {
        // Verifica se o link contém alguma das classes excluídas
        const shouldExclude = excludeClasses.some(className => 
            link.classList.contains(className)
        );

        if (!shouldExclude) {
            link.addEventListener('mousemove', activateLink);
            link.addEventListener('mouseleave', resetLink);
        }
    });
}

export default gsapLinks;
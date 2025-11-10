const travelInnerIcon = document.querySelector('.travel-inner-container-icon');
const travelInfoInnerIcon = document.querySelector('.travel-info-inner-container-icon');
const inner = document.querySelector('.travel-inner-container');
const info = document.querySelector('.travel-info-container');
const travelTranslate = () => {

    travelInnerIcon.addEventListener('click', (e) => {
        e.preventDefault();

        inner.classList.add('opened');

        info.classList.add('opened');
    });

    travelInfoInnerIcon.addEventListener('click', (e) => {
        e.preventDefault();

        inner.classList.remove('opened');

        info.classList.remove('opened');
    });

}

export default travelTranslate;
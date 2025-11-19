const travelsContainer = document.querySelector('.travels-container');

const reservationTranslate = () => {
    travelsContainer.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.closest('.travel-inner-container-icon')) {
            const container = e.target.closest('.travel-container');
            container.querySelector('.travel-inner-container').classList.add('opened');
            container.querySelector('.travel-info-container').classList.add('opened');
        }

        if (e.target.closest('.travel-info-inner-container-icon')) {
            const container = e.target.closest('.travel-container');
            container.querySelector('.travel-inner-container').classList.remove('opened');
            container.querySelector('.travel-info-container').classList.remove('opened');
        }
    });
};

export default reservationTranslate;

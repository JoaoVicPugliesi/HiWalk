import placeInfoFind from "./personal-1-personal-place-info-find.js";
const placeInfoMask = document.querySelector('.place-info-mask');
const placeInfo = document.querySelector('.place-info');
const placeH3 = document.querySelector('.place-info h3');
const placeImg = document.querySelector('.place-info img');
const html = document.querySelector('.html');
const destinations = document.querySelector('#destinations');
const click = document.querySelector('.click-audio');

const displayPlaceInfo = () => {
    document.addEventListener('DOMContentLoaded', () => {
        document.addEventListener('click', (e) => {
            if(e.target.closest('.place-icon-link')) {

                e.preventDefault();
                let placeId = e.target.closest('.place-icon-link').dataset.placeId;

                window.scrollTo({
                    top: destinations.offsetTop,
                    behavior: "smooth"
                })

                // Algorithm to display the correct place on the placeInfo div...

                let place = placeInfoFind(placeId);

                placeH3.textContent = place.name;
                placeImg.src = place.image;

                html.classList.remove('overflow');
                placeInfoMask.classList.add('block');
                placeInfo.classList.add('block');
            }

            if(e.target.closest('.place-info-close') || e.target.closest('.place-info-mask')) {
                click.play();
                placeH3.textContent = '';
                placeImg.src = '';
                html.classList.add('overflow');
                placeInfoMask.classList.remove('block');
                placeInfo.classList.remove('block');
            }
        });
    });
}

export default displayPlaceInfo;
const placeCreateBtn = document.querySelector('.create-btn');
const placeCreateContainer = document.querySelector('.place-create-container');
const placeCreateForm = document.querySelector('.place-create-form');
const placeCreateClose = document.querySelector('.place-create-close i');
const home = document.querySelector('#home');
const html = document.querySelector('.html');
const click = document.querySelector('.click-audio');

const displayPlaceCreate = () => {
    document.addEventListener('DOMContentLoaded', () => {
        placeCreateBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: home.offsetTop,
                behavior: "smooth"
            });

            html.classList.remove('overflow');
            placeCreateContainer.classList.add('block');
            placeCreateForm.classList.add('block');
        })

        document.addEventListener('click', (e) => {
            if (e.target === placeCreateContainer || e.target === placeCreateClose) {
                click.play();
                html.classList.add('overflow');
                placeCreateContainer.classList.remove('block');
                placeCreateForm.classList.remove('block');
            }
        })
    })
}

export default displayPlaceCreate;
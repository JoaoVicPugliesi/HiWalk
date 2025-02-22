const load = () => {
    window.addEventListener('load', function () {
        const loadScreen = document.querySelector('.load-screen');
        const html = document.querySelector('.html');
        loadScreen.classList.add('invisible');
        html.classList.add('overflow');
    });
}

export default load;
const load = () => {
    window.addEventListener('load', function () {
        const loadScreen = document.querySelector('.load-screen');
        const html = document.querySelector('.html');
        const tutorial_complete = false;
        loadScreen.classList.add('invisible');
        html.classList.add('overflow');
        if(!tutorial_complete) {
            const tutorial_container = document.querySelector(
                ".acessibility-tutorial-container",
            );
            tutorial_container.classList.add('visible');
        }
    });
}

export default load;
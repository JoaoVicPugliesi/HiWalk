const click = () => {
    const click = document.querySelector('.click-audio');
    const honk = document.querySelector('.honk-audio');

    document.addEventListener('click', (e) => {
        if (e.target.closest('a')) {
            if (click) {
                click.currentTime = 0;
                click.play().catch(() => {});
            } 
        }
        
        if(e.target.closest('.car')) {
            if (honk) {
                honk.currentTime = 0;
                honk.play().catch(() => {});
            }
        }
    });
}

export default click;

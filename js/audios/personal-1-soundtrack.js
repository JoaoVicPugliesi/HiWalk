const soundtrack = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const jazz = document.querySelector('.jazz-audio');
        const playBtn = document.querySelector('.play-btn');
        const muteBtn = document.querySelector('.mute-btn');

        if (!jazz || !playBtn || !muteBtn) return; 
        muteBtn.classList.add('invisible');
        /* 
            playBtn.classList.add('invisible');
            jazz.volume = 0.1;
            jazz.loop = true;
            jazz.play();
        */
        playBtn.addEventListener('click', (e) => {
            e.preventDefault();
            jazz.volume = 0.1;
            jazz.loop = true;
            jazz.play();
            playBtn.classList.add('invisible');
            muteBtn.classList.remove('invisible');
        });

        muteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            jazz.pause();
            muteBtn.classList.add('invisible');
            playBtn.classList.remove('invisible');
        });
    });
};


export default soundtrack;

const changeContainer = () => {
    
    const container = document.querySelector('.container');
    const containerIconLink = document.querySelectorAll('.container-icon-link');
    const playBtn = document.querySelector('.play-btn');
    const muteBtn = document.querySelector('.mute-btn');
    const createBtn = document.querySelector('.create-btn');
    const destinations = document.querySelector('#destinations');
    const calendar = document.querySelector('#calendar');

    if (!container || !destinations || !calendar) return;

    const destinationTop = destinations.offsetTop;
    const calendarTop = calendar.offsetTop;
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    
    if (scrollPosition >= destinationTop) {
        containerIconLink.forEach(ancher => {
            ancher.classList.add('change'); 
        });

        container.classList.add('change'); 
        playBtn.classList.add('change'); 
        muteBtn.classList.add('change'); 
        createBtn.classList.add('change'); 
    } 
    
    if(scrollPosition < destinationTop || scrollPosition >= calendarTop) {
        containerIconLink.forEach(ancher => {
            ancher.classList.remove('change'); 
        });
        container.classList.remove('change'); 
        playBtn.classList.remove('change'); 
        muteBtn.classList.remove('change'); 
        createBtn.classList.remove('change'); 
    }

    console.log("changing");
};

export default changeContainer;
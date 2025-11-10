const travelsDrag = () => {
    const travelsContainer = document.querySelector('.travels-container');

    let isDown = false;
    let startX;
    let scrollLeft;

    travelsContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        travelsContainer.classList.add('active');
        startX = e.pageX - travelsContainer.offsetLeft;
        scrollLeft = travelsContainer.scrollLeft;
    });

    travelsContainer.addEventListener('mouseleave', () => {
        isDown = false;
    });

    travelsContainer.addEventListener('mouseup', () => {
        isDown = false;
    });

    travelsContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - travelsContainer.offsetLeft;
        const walk = (x - startX) * 1.5;
        travelsContainer.scrollLeft = scrollLeft - walk;
    });

}

export default travelsDrag;
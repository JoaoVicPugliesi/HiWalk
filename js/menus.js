const initMenus = () => {
    const hamburgerBtn = document.getElementById('hamburger-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            const isActive = navLinks.classList.contains('active');
        });
    }

    const radialToggleBtn = document.querySelectorAll('.container-icon-link')[5];
    const radialContainer = document.querySelector('.radial-menu-container');

    if (radialToggleBtn && radialContainer) {
        radialToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            radialContainer.classList.toggle('active');
            const isActive = radialContainer.classList.contains('active');
        });
    }

    document.addEventListener('click', (e) => {
        if (navLinks && navLinks.classList.contains('active')) {
            if (!e.target.closest('.nav-links') && !e.target.closest('#hamburger-menu-btn')) {
                navLinks.classList.remove('active');              
            }
        }
        
        if (radialContainer && radialContainer.classList.contains('active')) {
            if (!e.target.closest('.radial-menu-container')) {
                radialContainer.classList.remove('active');
            }
        }
    });
};

export default initMenus;

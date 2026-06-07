const initMenus = () => {
    const hamburgerBtn = document.getElementById('hamburger-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            const isActive = navLinks.classList.contains('active');
            hamburgerBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        });
    }

    const radialToggleBtn = document.querySelector('.radial-menu-toggle');
    const radialContainer = document.querySelector('.radial-menu-container');

    if (radialToggleBtn && radialContainer) {
        radialToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            radialContainer.classList.toggle('active');
            const isActive = radialContainer.classList.contains('active');
            radialToggleBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        });
    }

    document.addEventListener('click', (e) => {
        if (navLinks && navLinks.classList.contains('active')) {
            if (!e.target.closest('.nav-links') && !e.target.closest('#hamburger-menu-btn')) {
                navLinks.classList.remove('active');
                if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
            }
        }
        
        if (radialContainer && radialContainer.classList.contains('active')) {
            if (!e.target.closest('.radial-menu-container')) {
                radialContainer.classList.remove('active');
                if (radialToggleBtn) radialToggleBtn.setAttribute('aria-expanded', 'false');
            }
        }
    });
};

export default initMenus;

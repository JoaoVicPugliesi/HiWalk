class HighContrastManager {
    constructor() {
        this.storageKey = 'hiwalk-high-contrast';

        this.isActive = false;

        this.loadSavedPreference();

        this.applyState();

        this.setupEventListeners();
    }

    loadSavedPreference() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved !== null) {
            this.isActive = saved === 'true';
        }
    }

    applyState() {
        const htmlElement = document.documentElement;

        if (this.isActive) {
            htmlElement.classList.add('high-contrast');
        } else {
            htmlElement.classList.remove('high-contrast');
        }

        this.updateToggleButton();
    }

    toggle() {
        this.isActive = !this.isActive;
        this.applyState();
        this.savePreference();
    }

    savePreference() {
        localStorage.setItem(this.storageKey, this.isActive.toString());
    }

    updateToggleButton() {
        const toggleBtn = document.querySelector('[data-high-contrast-toggle]');
        if (!toggleBtn) return;

        toggleBtn.setAttribute('aria-pressed', this.isActive ? 'true' : 'false');
        toggleBtn.setAttribute(
            'aria-label',
            this.isActive
                ? 'Desativar modo de alto contraste'
                : 'Ativar modo de alto contraste'
        );

        if (this.isActive) {
            toggleBtn.classList.add('active');
        } else {
            toggleBtn.classList.remove('active');
        }
    }

    setupEventListeners() {
        const toggleBtn = document.querySelector('[data-high-contrast-toggle]');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggle();
            });
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.highContrastManager = new HighContrastManager();
    });
} else {
    window.highContrastManager = new HighContrastManager();
}

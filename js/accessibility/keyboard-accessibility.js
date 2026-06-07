document.addEventListener('DOMContentLoaded', () => {
    let lastActiveElement = null;
    let currentTrap = null;
    let pendingTriggerElement = null;
    let isRestoringFocus = false;

    const focusableSelectors = [
        'a[href]',
        'area[href]',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        'button:not([disabled])',
        'iframe',
        'object',
        'embed',
        '[tabindex]:not([tabindex="-1"])',
        '[contenteditable="true"]'
    ].join(',');

    const getFocusableElements = (container) => {
        return Array.from(container.querySelectorAll(focusableSelectors)).filter((element) => {
            const style = window.getComputedStyle(element);
            const rect = element.getBoundingClientRect();

            return style.display !== 'none'
                && style.visibility !== 'hidden'
                && rect.width > 0
                && rect.height > 0;
        });
    };

    const releaseFocusTrap = () => {
        if (currentTrap) {
            document.removeEventListener('keydown', currentTrap.handler, true);
            currentTrap = null;
        }
    };

    const restoreFocus = () => {
        releaseFocusTrap();

        if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
            isRestoringFocus = true;
            lastActiveElement.focus();
            window.setTimeout(() => {
                isRestoringFocus = false;
            }, 0);
        }
    };

    const setupFocusTrap = (modal, closeButtonSelector, triggerElement) => {
        if (!modal) return;

        lastActiveElement = triggerElement || document.activeElement;
        releaseFocusTrap();
        modal.setAttribute('tabindex', '-1');

        const handleKeydown = (event) => {
            if (!modal.classList.contains('block')) {
                restoreFocus();
                return;
            }

            if (event.key === 'Escape') {
                event.preventDefault();
                const closeButton = modal.querySelector(closeButtonSelector);

                if (closeButton) {
                    closeButton.click();
                } else {
                    modal.classList.remove('block');
                    restoreFocus();
                }

                return;
            }

            if (event.key !== 'Tab') return;

            const focusableElements = getFocusableElements(modal);
            if (focusableElements.length === 0) {
                event.preventDefault();
                return;
            }

            event.preventDefault();

            const currentIndex = focusableElements.indexOf(document.activeElement);
            const direction = event.shiftKey ? -1 : 1;
            const fallbackIndex = event.shiftKey ? focusableElements.length - 1 : 0;
            const nextIndex = currentIndex === -1
                ? fallbackIndex
                : (currentIndex + direction + focusableElements.length) % focusableElements.length;

            focusableElements[nextIndex].focus();
        };

        currentTrap = { modal, handler: handleKeydown };
        document.addEventListener('keydown', handleKeydown, true);

        window.setTimeout(() => {
            const focusableElements = getFocusableElements(modal);
            const closeButton = modal.querySelector(closeButtonSelector);

            if (closeButton) {
                closeButton.focus();
                return;
            }

            if (focusableElements.length > 0) {
                focusableElements[0].focus();
                return;
            }

            modal.focus();
        }, 0);
    };

    const modalConfigs = [
        {
            modal: document.querySelector('.place-create-container'),
            closeButtonSelector: '.place-create-close'
        },
        {
            modal: document.querySelector('.place-info'),
            closeButtonSelector: '.place-info-close'
        }
    ];

    const watchModal = ({ modal, closeButtonSelector }) => {
        if (!modal) return;

        const observer = new MutationObserver(() => {
            if (modal.classList.contains('block')) {
                if (!currentTrap || currentTrap.modal !== modal) {
                    setupFocusTrap(modal, closeButtonSelector, pendingTriggerElement);
                }
                return;
            }

            if (currentTrap && currentTrap.modal === modal) {
                releaseFocusTrap();
            }
        });

        observer.observe(modal, { attributes: true, attributeFilter: ['class'] });
    };

    modalConfigs.forEach(watchModal);

    document.addEventListener('hiwalk:modal-opened', (event) => {
        const { modal, closeButtonSelector, triggerElement } = event.detail || {};
        setupFocusTrap(modal, closeButtonSelector, triggerElement);
    });

    document.addEventListener('click', (event) => {
        const triggerElement = event.target.closest('.create-btn, .place-icon-link');

        if (triggerElement) {
            pendingTriggerElement = triggerElement;
        }
    }, true);

    document.addEventListener('focusin', (event) => {
        if (!currentTrap || isRestoringFocus || !currentTrap.modal.classList.contains('block')) return;
        if (currentTrap.modal.contains(event.target)) return;

        const focusableElements = getFocusableElements(currentTrap.modal);

        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        } else {
            currentTrap.modal.focus();
        }
    });

    document.addEventListener('click', (event) => {
        if (
            event.target.closest('.place-create-close')
            || event.target.closest('.place-info-close')
            || event.target.classList.contains('place-create-container')
        ) {
            restoreFocus();
        }
    });

    document.addEventListener('keydown', (event) => {
        const target = event.target;

        if ((event.key === ' ' || event.key === 'Spacebar')
            && target.tagName === 'A'
            && target.classList.contains('container-icon-link')) {
            event.preventDefault();
            target.click();
        }
    });
});

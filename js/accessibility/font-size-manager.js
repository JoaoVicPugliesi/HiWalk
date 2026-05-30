/**
 * Font Size Manager - Accessibility Feature
 * Allows users to increase/decrease font size across the entire application
 */

class FontSizeManager {
    constructor() {
        // Tamanho base de fonte em pixels (padrão do navegador)
        this.baseFontSize = 16;
        
        // Níveis de aumento de fonte: -2, -1, 0 (padrão), +1, +2, +3
        this.minLevel = -2;
        this.maxLevel = 3;
        this.currentLevel = 0;
        
        // Storage key para persistência
        this.storageKey = 'hiwalk-font-size-level';
        
        // Recuperar preferência salva
        this.loadSavedLevel();
        
        // Aplicar o nível salvo
        this.updateFontSize();
        
        // Configurar event listeners
        this.setupEventListeners();
    }
    
    /**
     * Carrega o nível de fonte salvo no localStorage
     */
    loadSavedLevel() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved !== null) {
            this.currentLevel = parseInt(saved);
        }
    }
    
    /**
     * Calcula o tamanho de fonte baseado no nível
     * Cada nível aumenta/diminui em 10%
     */
    calculateFontSize() {
        // Fórmula: baseFontSize * (1.1 ^ nivel)
        // -2: 81.6%, -1: 90%, 0: 100%, +1: 110%, +2: 121%, +3: 133.1%
        return this.baseFontSize * Math.pow(1.1, this.currentLevel);
    }
    
    /**
     * Atualiza o font-size do elemento raiz
     */
    updateFontSize() {
        const newFontSize = this.calculateFontSize();
        document.documentElement.style.fontSize = newFontSize + 'px';
    }
    
    /**
     * Aumenta o tamanho da fonte
     */
    increaseFontSize() {
        if (this.currentLevel < this.maxLevel) {
            this.currentLevel++;
            this.updateFontSize();
            this.saveFontSizeLevel();
            this.updateButtonStates();
        }
    }
    
    /**
     * Diminui o tamanho da fonte
     */
    decreaseFontSize() {
        if (this.currentLevel > this.minLevel) {
            this.currentLevel--;
            this.updateFontSize();
            this.saveFontSizeLevel();
            this.updateButtonStates();
        }
    }
    
    /**
     * Reseta o tamanho da fonte para o padrão
     */
    resetFontSize() {
        this.currentLevel = 0;
        this.updateFontSize();
        this.saveFontSizeLevel();
        this.updateButtonStates();
    }
    
    /**
     * Salva o nível atual no localStorage
     */
    saveFontSizeLevel() {
        localStorage.setItem(this.storageKey, this.currentLevel.toString());
    }
    
    /**
     * Atualiza o estado dos botões (desabilita quando atinge limites)
     */
    updateButtonStates() {
        const increaseBtnElement = document.querySelector('[data-font-increase]');
        const decreaseBtnElement = document.querySelector('[data-font-decrease]');
        
        if (increaseBtnElement) {
            increaseBtnElement.disabled = this.currentLevel >= this.maxLevel;
            increaseBtnElement.setAttribute(
                'aria-disabled',
                this.currentLevel >= this.maxLevel ? 'true' : 'false'
            );
        }
        
        if (decreaseBtnElement) {
            decreaseBtnElement.disabled = this.currentLevel <= this.minLevel;
            decreaseBtnElement.setAttribute(
                'aria-disabled',
                this.currentLevel <= this.minLevel ? 'true' : 'false'
            );
        }
    }
    
    /**
     * Configura os event listeners dos botões
     */
    setupEventListeners() {
        // Botão de aumentar
        const increaseBtn = document.querySelector('[data-font-increase]');
        if (increaseBtn) {
            increaseBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.increaseFontSize();
            });
        }
        
        // Botão de diminuir
        const decreaseBtn = document.querySelector('[data-font-decrease]');
        if (decreaseBtn) {
            decreaseBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.decreaseFontSize();
            });
        }
        
        // Botão de reset
        const resetBtn = document.querySelector('[data-font-reset]');
        if (resetBtn) {
            resetBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.resetFontSize();
            });
        }
        
        // Atualizar estado inicial dos botões
        this.updateButtonStates();
    }
}

// Inicializar o gerenciador quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.fontSizeManager = new FontSizeManager();
});

// Inicializar também se o script for carregado depois do DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.fontSizeManager = new FontSizeManager();
    });
} else {
    window.fontSizeManager = new FontSizeManager();
}

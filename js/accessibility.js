class Accessibility {
    constructor() {
        this.highContrast = false;
        this.fontSize = 'normal';
        this.init();
    }

    init() {
        this.loadPreferences();
        this.setupEventListeners();
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
    }

    loadPreferences() {
        const savedContrast = localStorage.getItem('highContrast');
        const savedFontSize = localStorage.getItem('fontSize');
        
        if (savedContrast === 'true') {
            this.toggleHighContrast();
        }
        
        if (savedFontSize) {
            this.setFontSize(savedFontSize);
        }
    }

    setupEventListeners() {
        const highContrastBtn = document.getElementById('high-contrast-btn');
        const fontSizeIncrease = document.getElementById('font-size-increase');
        const fontSizeDecrease = document.getElementById('font-size-decrease');

        if (highContrastBtn) {
            highContrastBtn.addEventListener('click', () => this.toggleHighContrast());
            highContrastBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleHighContrast();
                }
            });
        }

        if (fontSizeIncrease) {
            fontSizeIncrease.addEventListener('click', () => this.increaseFontSize());
        }

        if (fontSizeDecrease) {
            fontSizeDecrease.addEventListener('click', () => this.decreaseFontSize());
        }
    }

    toggleHighContrast() {
        this.highContrast = !this.highContrast;
        
        if (this.highContrast) {
            document.documentElement.classList.add('high-contrast');
        } else {
            document.documentElement.classList.remove('high-contrast');
        }
        
        localStorage.setItem('highContrast', this.highContrast);
        
        const button = document.getElementById('high-contrast-btn');
        if (button) {
            const icon = button.querySelector('span');
            if (icon) {
                icon.textContent = this.highContrast ? '☀️' : '🌙';
            }
            button.setAttribute('aria-label', 
                this.highContrast ? 'Desativar alto contraste' : 'Ativar alto contraste'
            );
        }
    }

    increaseFontSize() {
        const sizes = ['normal', 'large', 'xlarge'];
        const currentIndex = sizes.indexOf(this.fontSize);
        if (currentIndex < sizes.length - 1) {
            this.setFontSize(sizes[currentIndex + 1]);
        }
    }

    decreaseFontSize() {
        const sizes = ['normal', 'large', 'xlarge'];
        const currentIndex = sizes.indexOf(this.fontSize);
        if (currentIndex > 0) {
            this.setFontSize(sizes[currentIndex - 1]);
        }
    }

    setFontSize(size) {
        document.documentElement.classList.remove('font-large', 'font-xlarge');
        
        if (size !== 'normal') {
            document.documentElement.classList.add(`font-${size}`);
        }
        
        this.fontSize = size;
        localStorage.setItem('fontSize', size);
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.documentElement.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.documentElement.classList.remove('keyboard-navigation');
        });
    }

    setupFocusManagement() {
        const focusableElements = document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.classList.add('focus-visible');
            });

            element.addEventListener('blur', () => {
                element.classList.remove('focus-visible');
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Accessibility();
});

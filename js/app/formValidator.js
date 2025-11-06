export default class FormValidator {
    constructor() {
        this.validationRules = {
            nome: {
                required: true,
                minLength: 3,
                maxLength: 100,
                pattern: /^[A-Za-zÀ-ÿ\s]+$/
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            },
            telefone: {
                required: false,
                pattern: /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/
            }
        };
    }

    validateField(field) {
        const rules = this.validationRules[field.name];
        const value = field.value.trim();
        const errorElement = document.getElementById(`${field.name}Error`);
        
        if (!rules) return true;

        if (rules.required && !value) {
            this.showError(field, errorElement, 'Este campo é obrigatório');
            return false;
        }

        if (value && rules.minLength && value.length < rules.minLength) {
            this.showError(field, errorElement, `Mínimo ${rules.minLength} caracteres`);
            return false;
        }

        if (value && rules.maxLength && value.length > rules.maxLength) {
            this.showError(field, errorElement, `Máximo ${rules.maxLength} caracteres`);
            return false;
        }

        if (value && rules.pattern && !rules.pattern.test(value) && value.length > 0) {
            this.showError(field, errorElement, 'Formato inválido');
            return false;
        }

        this.clearError(field, errorElement);
        return true;
    }

    showError(field, errorElement, message) {
        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    clearError(field, errorElement) {
        field.classList.remove('error');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }

    validateForm(form) {
        const fields = form.querySelectorAll('input, select, textarea');
        let isValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    init() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const fields = form.querySelectorAll('input, select, textarea');
            
            fields.forEach(field => {
                field.addEventListener('blur', () => this.validateField(field));
                field.addEventListener('input', () => {
                    if (field.classList.contains('error')) {
                        this.validateField(field);
                    }
                });
            });

            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                    this.showFormError(form, 'Por favor, corrija os erros acima.');
                }
            });
        });
    }

    showFormError(form, message) {
        let existingError = form.querySelector('.form-error');
        if (!existingError) {
            existingError = document.createElement('div');
            existingError.className = 'form-error alert error';
            form.prepend(existingError);
        }
        existingError.textContent = message;
    }
}

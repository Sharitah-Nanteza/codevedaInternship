document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('interactiveForm');
    const successBox = document.getElementById('successBox');

    const fields = {
        name: document.getElementById('fullName'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        password: document.getElementById('password')
    };

    const validators = {
        name: (value) => value.trim().length >= 3,
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        phone: (value) => /^[0-9+\s-]{9,13}$/.test(value.trim()),
        password: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)
    };

    function validateField(fieldName, element) {
        const value = element.value;
        const isValid = validators[fieldName](value);
        const parent = element.parentElement;

        if (!isValid && value !== "") {
            parent.classList.add('invalid');
            parent.classList.remove('valid');
        } else if (isValid) {
            parent.classList.remove('invalid');
            parent.classList.add('valid');
        } else {
            parent.classList.remove('invalid');
            parent.classList.remove('valid');
        }
        return isValid;
    }

    Object.keys(fields).forEach((key) => {
        const inputElement = fields[key];

        inputElement.addEventListener('blur', () => {
            validateField(key, inputElement);
        });

        inputElement.addEventListener('input', () => {
            if (validators[key](inputElement.value)) {
                inputElement.parentElement.classList.remove('invalid');
                inputElement.parentElement.classList.add('valid');
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isFormValid = true;

        Object.keys(fields).forEach((key) => {
            const isValid = validateField(key, fields[key]);
            if (!isValid) {
                isFormValid = false;
                fields[key].parentElement.classList.add('invalid');
            }
        });

        if (isFormValid) {
            form.style.display = 'none';
            successBox.style.display = 'block';
        }
    });
});
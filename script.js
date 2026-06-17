document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('subscription-form');
    const greetingTitle = document.getElementById('form-greeting');
    const fullNameInput = document.getElementById('fullname');

    const validators = {
        fullname: (val) => {
            const clean = val.trim();
            if (clean.length <= 6) return "Debe tener más de 6 letras.";
            if (!clean.includes(' ')) return "Debe contener al menos un espacio en el medio.";
            return true;
        },
        email: (val) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(val)) return "Formato de email inválido.";
            return true;
        },
        password: (val) => {
            if (val.length < 8) return "Debe tener al menos 8 caracteres.";
            const hasLetter = /[a-zA-Z]/.test(val);
            const hasNumber = /[0-9]/.test(val);
            if (!hasLetter || !hasNumber) return "Debe contener letras y números.";
            return true;
        },
        confirmPassword: (val) => {
            const passVal = document.getElementById('password').value;
            if (val !== passVal) return "Ambas contraseñas deben ser iguales.";
            if (!val) return "Por favor confirme su contraseña.";
            return true;
        },
        age: (val) => {
            const num = Number(val);
            if (!val || !Number.isInteger(num)) return "Debe ingresar un número entero.";
            if (num < 18) return "Debe ser mayor o igual a 18 años.";
            return true;
        },
        phone: (val) => {
            const phoneRegex = /^[0-9]+$/;
            if (val.length < 7) return "Debe tener al menos 7 dígitos.";
            if (!phoneRegex.test(val)) return "No se aceptan espacios, guiones ni paréntesis.";
            return true;
        },
        address: (val) => {
            const clean = val.trim();
            if (clean.length < 5) return "Debe tener al menos 5 caracteres.";
            const hasLetter = /[a-zA-Z]/.test(clean);
            const hasNumber = /[0-9]/.test(clean);
            if (!hasLetter || !hasNumber || !clean.includes(' ')) {
                return "Debe incluir letras, números y un espacio en el medio.";
            }
            return true;
        },
        city: (val) => {
            if (val.trim().length < 3) return "Debe tener al menos 3 caracteres.";
            return true;
        },
        zip: (val) => {
            if (val.trim().length < 3) return "Debe tener al menos 3 caracteres.";
            return true;
        },
        dni: (val) => {
            const dniRegex = /^[0-9]+$/;
            if (val.length < 7 || val.length > 8) return "Debe tener 7 u 8 dígitos.";
            if (!dniRegex.test(val)) return "Solo se admiten números.";
            return true;
        }
    };

    function validateField(input) {
        const group = input.closest('.form-group');
        const errorText = group.querySelector('.error-message');
        const validator = validators[input.id];
        
        if (!validator) return true;

        const result = validator(input.value);

        if (result === true) {
            group.classList.remove('invalid');
            group.classList.add('valid');
            return true;
        } else {
            group.classList.remove('valid');
            group.classList.add('invalid');
            errorText.textContent = result;
            return false;
        }
    }

    function clearFieldStatus(input) {
        const group = input.closest('.form-group');
        group.classList.remove('invalid');
        group.classList.remove('valid');
    }

    Object.keys(validators).forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('focus', () => clearFieldStatus(input));
        }
    });

    function updateGreeting() {
        const value = fullNameInput.value.trim().toUpperCase();
        if (value === "") {
            greetingTitle.textContent = "HOLA";
        } else {
            greetingTitle.textContent = `HOLA ${value}`;
        }
    }
    fullNameInput.addEventListener('keyup', updateGreeting);
    fullNameInput.addEventListener('keydown', updateGreeting);
    fullNameInput.addEventListener('focus', updateGreeting);


    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        let formIsValid = true;
        let successData = "Suscripción Exitosa:\n\n";
        let errorData = "Errores en el formulario:\n\n";

        Object.keys(validators).forEach(id => {
            const input = document.getElementById(id);
            const isFieldValid = validateField(input);
            const group = input.closest('.form-group');
            const labelText = group.querySelector('label').textContent; 
            
            if (isFieldValid) {
                successData += `${labelText}: ${input.value}\n`;
            } else {
                formIsValid = false;
                const errorMessage = group.querySelector('.error-message').textContent;
                errorData += `- ${labelText}: ${errorMessage}\n`;
            }
        });

        if (formIsValid) {
            alert(successData);
            
            form.reset(); 
            
            Object.keys(validators).forEach(id => {
                const input = document.getElementById(id);
                const group = input.closest('.form-group');
                if (group) {
                    group.classList.remove('success', 'error'); 
                    const statusIcon = group.querySelector('.status-icon');
                    if (statusIcon) statusIcon.textContent = ''; 
                }
            });

        } else {
            alert(errorData);
        }
    });
});
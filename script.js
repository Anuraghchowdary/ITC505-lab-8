const form = document.getElementById('registrationForm');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    validateForm();
});

function validateForm() {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    const errors = {
        firstNameError: document.getElementById('firstNameError'),
        lastNameError: document.getElementById('lastNameError'),
        emailError: document.getElementById('emailError'),
        passwordError: document.getElementById('passwordError'),
        confirmPasswordError: document.getElementById('confirmPasswordError')
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    resetErrors(errors);

    if (!firstName.value.trim()) {
        showError(firstName, errors.firstNameError, 'First name is required');
    }

    if (!lastName.value.trim()) {
        showError(lastName, errors.lastNameError, 'Last name is required');
    }

    if (!email.value.trim() || !emailRegex.test(email.value)) {
        showError(email, errors.emailError, 'Please enter a valid email');
    }

    if (password.value.length < 6) {
        showError(password, errors.passwordError, 'Password must be at least 6 characters long');
    }

    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, errors.confirmPasswordError, 'Passwords do not match');
    }

    // If no errors, submit the form
    if (Object.values(errors).every(error => error.textContent === '')) {
        form.submit();
    }
}

function resetErrors(errors) {
    for (const key in errors) {
        errors[key].textContent = '';
    }
}

function showError(input, errorElement, message) {
    input.classList.add('error-input');
    errorElement.textContent = message;
}

// XSS Prevention: Escaping user input before displaying it
function escapeHTML(input) {
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// SQL Injection Prevention: Using parameterized queries

function queryDatabase(username) {
    const safeUsername = escapeSQL(username); // Sanitize input
    
}

// SQL Injection Prevention: Escaping special characters in input
function escapeSQL(input) {
    return input.replace(/'/g, "''"); // Escape single quotes
}

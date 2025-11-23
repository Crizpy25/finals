function validateRegister(event) {
    if (event && event.preventDefault) event.preventDefault();

    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const registerMessage = document.getElementById('registerMessage');

    if (!fullname || !email || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return false;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return false;
    }

    const user = {
        fullname: fullname,
        email: email,
        password: password
    };

    
    localStorage.setItem('registeredUser', JSON.stringify(user));

    if (registerMessage) {
        registerMessage.textContent = 'Registration successful! You can now login.';
    }

    const form = document.getElementById('registerForm');
    if (form) form.reset();

    return false;
}


window.validateRegister = validateRegister;
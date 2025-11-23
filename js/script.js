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

document.addEventListener('DOMContentLoaded', function() {
  const grid = document.getElementById('supportGrid');
  if (!grid) return;

  const topics = {
    orders: { title: 'Orders', content: 'To track or modify your orders, go to your account > Orders. You can cancel within 24 hours if it has not shipped.' },
    shipping: { title: 'Shipping', content: 'Shipping times vary by location. Once shipped, you will receive a tracking number via email.' },
    returns: { title: 'Returns', content: 'Returns accepted within 14 days of delivery. Items must be in original condition.' },
    payments: { title: 'Payments', content: 'Payment issues? Try the troubleshooting steps or use the payment options on the support page.' },
    technical: { title: 'Technical', content: 'Restart your device first. If the issue persists, contact support with details.' },
    warranty: { title: 'Warranty', content: 'Warranty claims require proof of purchase. Contact our service center for help.' },
    account: { title: 'Account', content: 'Reset your password or update account info from the profile page.' },
    'returns-help': { title: 'Refunds', content: 'Refunds are processed within 7 business days after we receive the returned item.' },
    other: { title: 'Other', content: 'For other questions, use the contact form on the Contacts page.' }
  };

  grid.addEventListener('click', function(e) {
    const btn = e.target.closest('button[data-topic]');
    if (!btn) return;
    const key = btn.dataset.topic;
    const t = topics[key];
    if (!t) return;
    alert(t.title + '\n\n' + t.content);
  });
});



window.validateRegister = validateRegister;


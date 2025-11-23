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


(function () {
  const KEY = "apol_cart_v1";

  const read = () => JSON.parse(localStorage.getItem(KEY) || "[]");
  const write = (c) => localStorage.setItem(KEY, JSON.stringify(c));

  window.apolAddToCart = (item) => {
    const cart = read();
    cart.push(item);
    write(cart);
    alert("Added to cart: " + item.title);
  };

  const container = document.getElementById("cartItemsContainer");
  const summary = document.getElementById("cartSummary");
  if (!container) return;

  function render() {
    const cart = read();
    container.innerHTML = "";

    if (!cart.length) {
      container.innerHTML = "<p>Your cart is empty.</p>";
      summary.innerHTML = "";
      return;
    }

    // Items
    cart.forEach((item, i) => {
      container.innerHTML += `
        <div class="flex items-center gap-4 bg-white p-3 rounded border">
          <img src="${item.image || 'images/grid1.jpg'}"
               alt="${item.title}"
               class="w-20 h-20 object-cover rounded">

          <div class="flex-1">
            <div class="font-semibold">${item.title}</div>
            <div class="text-sm text-gray-600">${item.desc || ""}</div>
          </div>

          <div class="text-lg font-bold">₱${item.price || 0}</div>

          <button data-i="${i}"
                  class="remove bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">
            Remove
          </button>
        </div>
      `;
    }); 

    // Summary
    const total = cart.reduce((t, i) => t + Number(i.price || 0), 0);
    summary.innerHTML = `
      <div class="flex justify-between">
        <div class="text-lg font-bold">Total</div>
        <div class="text-xl font-extrabold">₱${total.toFixed(2)}</div>
      </div>

      <div class="mt-4 flex gap-2">
        <button id="checkoutBtn"
                class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800">
          Checkout
        </button>

        <button id="clearCartBtn"
                class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
          Clear Cart
        </button>
      </div>
    `;

    // Handlers
    container.querySelectorAll(".remove").forEach((btn) => {
      btn.onclick = () => {
        const idx = btn.dataset.i;
        const c = read();
        c.splice(idx, 1);
        write(c);
        render();
      };
    });

    document.getElementById("clearCartBtn").onclick = () => {
      if (confirm("Clear cart?")) {
        write([]);
        render();
      }
    };

    document.getElementById("checkoutBtn").onclick = () => {
      alert("Done Checkout.");
    };
  }

  render();
})();




window.validateRegister = validateRegister;


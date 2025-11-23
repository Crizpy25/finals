// Simple cart management using localStorage
(function(){
  const STORAGE_KEY = 'apol_cart_v1';

  function readCart(){
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch(e){ return []; }
  }
  function writeCart(cart){ localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); }

  function addToCart(item){
    const cart = readCart();
    cart.push(item);
    writeCart(cart);
    alert('Added to cart: ' + item.title);
  }

  // expose addToCart globally so product pages can call it
  window.apolAddToCart = addToCart;

  // If on cart page, render contents
  if (!document.getElementById('cartItemsContainer')) return;

  function renderCart(){
    const container = document.getElementById('cartItemsContainer');
    const summary = document.getElementById('cartSummary');
    const cart = readCart();

    container.innerHTML = '';
    if (cart.length === 0) {
      container.innerHTML = '<p>Your cart is empty.</p>';
      summary.innerHTML = '';
      return;
    }

    cart.forEach((it, idx) => {
      const div = document.createElement('div');
      div.className = 'flex items-center gap-4 bg-white p-3 rounded border';
      div.innerHTML = `
        <img src="${it.image || 'images/grid1.jpg'}" alt="${it.title}" class="w-20 h-20 object-cover rounded">
        <div class="flex-1">
          <div class="font-semibold">${it.title}</div>
          <div class="text-sm text-gray-600">${it.desc || ''}</div>
        </div>
        <div class="text-lg font-bold">${it.price ? '₱' + it.price : ''}</div>
        <button data-idx="${idx}" class="remove-btn bg-red-500 text-white px-3 py-1 rounded ml-2">Remove</button>
      `;
      container.appendChild(div);
    });

    const total = cart.reduce((s, i) => s + (Number(i.price) || 0), 0);
    summary.innerHTML = `
      <div class="flex items-center justify-between">
        <div class="text-lg font-bold">Total</div>
        <div class="text-xl font-extrabold">₱${total.toFixed(2)}</div>
      </div>
      <div class="mt-4 flex gap-2">
        <button id="checkoutBtn" class="bg-green-600 text-white px-4 py-2 rounded">Checkout</button>
        <button id="clearCartBtn" class="bg-gray-300 px-4 py-2 rounded">Clear Cart</button>
      </div>
    `;

    // remove handlers
    Array.from(document.getElementsByClassName('remove-btn')).forEach(btn => {
      btn.addEventListener('click', function(){
        const idx = Number(this.dataset.idx);
        const c = readCart();
        c.splice(idx,1);
        writeCart(c);
        renderCart();
      });
    });

    document.getElementById('clearCartBtn').addEventListener('click', function(){
      if (!confirm('Clear cart?')) return;
      writeCart([]);
      renderCart();
    });

    document.getElementById('checkoutBtn').addEventListener('click', function(){
      alert('Checkout is a demo.');
    });
  }

  renderCart();
})();
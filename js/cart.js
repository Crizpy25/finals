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

          <div class="text-lg font-bold">$${item.price || 0}</div>

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
        <div class="text-xl font-extrabold">$${total.toFixed(2)}</div>
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

const categorySearch = document.querySelector("#category-search");
const categoryGrid = document.querySelector("#category-grid");
const emptyMessage = document.querySelector("#category-empty");

if (!categorySearch || !categoryGrid || !emptyMessage) {
  throw new Error("Category search elements are required.");
}

const categoryCards = categoryGrid.querySelectorAll(".category-card");

categorySearch.addEventListener("input", () => {
  const query = categorySearch.value.trim().toLowerCase();
  let visibleCount = 0;

  categoryCards.forEach((card) => {
    const categoryName = card.querySelector("h3").textContent.trim().toLowerCase();
    const matches = categoryName.includes(query);
    card.hidden = !matches;
    if (matches) visibleCount += 1;
  });

  emptyMessage.hidden = visibleCount > 0;
});

const cart = new Map();
const headerCart = document.querySelector("#header-cart");
const cartDrawer = document.querySelector("#cart-drawer");
const cartBackdrop = document.querySelector("#cart-backdrop");
const cartClose = document.querySelector("#cart-close");
const cartItems = document.querySelector("#cart-items");
const cartCount = document.querySelector("#cart-count");
const headerCartCount = document.querySelector("#header-cart-count");
const cartItemCount = document.querySelector("#cart-item-count");
const checkoutButton = document.querySelector("#checkout-button");

function openCart() {
  cartDrawer.classList.add("open");
  cartBackdrop.hidden = false;
  cartDrawer.setAttribute("aria-hidden", "false");
  headerCart.setAttribute("aria-expanded", "true");
  document.body.classList.add("cart-open");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartBackdrop.hidden = true;
  cartDrawer.setAttribute("aria-hidden", "true");
  headerCart.setAttribute("aria-expanded", "false");
  document.body.classList.remove("cart-open");
}

function getTotalItems() {
  return Array.from(cart.values()).reduce((total, quantity) => total + quantity, 0);
}

function renderCart() {
  const totalItems = getTotalItems();
  cartCount.textContent = totalItems;
  headerCartCount.textContent = totalItems;
  cartItemCount.textContent = totalItems;
  checkoutButton.disabled = totalItems === 0;
  headerCart.classList.toggle("has-items", totalItems > 0);
  cartItems.innerHTML = "";

  if (totalItems === 0) {
    cartItems.innerHTML = '<div class="cart-empty"><span>0</span><p>Your cart is empty</p></div>';
    return;
  }

  cart.forEach((quantity, name) => {
    const item = document.createElement("div");
    item.className = "cart-item";
    item.innerHTML = `
      <div>
        <strong>${name}</strong>
        <small>Qty: ${quantity}</small>
      </div>
      <div class="cart-item-actions">
        <button type="button" data-action="decrease" data-name="${name}" aria-label="Decrease ${name}">-</button>
        <span>${quantity}</span>
        <button type="button" data-action="increase" data-name="${name}" aria-label="Increase ${name}">+</button>
      </div>
    `;
    cartItems.appendChild(item);
  });
}

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const name = button.dataset.name;
  const quantity = cart.get(name) || 0;
  if (button.dataset.action === "increase") {
    cart.set(name, quantity + 1);
  } else if (quantity <= 1) {
    cart.delete(name);
  } else {
    cart.set(name, quantity - 1);
  }
  renderCart();
});

headerCart.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
cartBackdrop.addEventListener("click", closeCart);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeCart();
});

checkoutButton.addEventListener("click", () => {
  alert(`Order has ${getTotalItems()} item(s).`);
});

renderCart();

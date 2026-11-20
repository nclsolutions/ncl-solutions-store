const cartCount = document.querySelector("#cart-count");
const toast = document.querySelector("#action-toast");
let cartItemCount = 0;
let toastTimeout;

if (!cartCount || !toast) {
  throw new Error("Cart status and action feedback elements are required.");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

document.querySelectorAll(".heart").forEach((button) => {
  const productName = button.closest(".product-card").querySelector("h3").textContent;

  button.addEventListener("click", () => {
    const isFavorite = !button.classList.contains("active");
    button.classList.toggle("active", isFavorite);
    button.setAttribute("aria-pressed", String(isFavorite));
    button.setAttribute(
      "aria-label",
      `${isFavorite ? "Remove" : "Add"} ${productName} ${isFavorite ? "from" : "to"} favourites`
    );
    button.textContent = isFavorite ? "♥" : "♡";
    showToast(`${productName} ${isFavorite ? "added to" : "removed from"} favourites.`);
  });
});

document.querySelectorAll(".add-button").forEach((button) => {
  const productName = button.closest(".product-card").querySelector("h3").textContent;

  button.addEventListener("click", () => {
    cartItemCount += 1;
    cartCount.textContent = String(cartItemCount);
    showToast(`${productName} added to cart.`);
  });
});

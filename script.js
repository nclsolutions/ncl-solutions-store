const categorySearch = document.querySelector("#category-search");
const categoryGrid = document.querySelector("#category-grid");
const emptyMessage = document.querySelector("#category-empty");
const smartPhonesCategory = document.querySelector("#smart-phones-category");
const smartPhonesProducts = document.querySelector("#smart-phones-products");
const closeSmartPhonesButton = document.querySelector("#close-smart-phones");
const phoneBrandList = document.querySelector("#phone-brand-list");
const phoneBrandButtons = Array.from(phoneBrandList.querySelectorAll(".phone-brand-button"));
const brandProducts = document.querySelector("#brand-products");
const selectedBrandHeading = document.querySelector("#selected-brand-heading");
const brandEmptyMessage = document.querySelector("#brand-empty-message");
const phoneProductGrid = document.querySelector("#phone-product-grid");
const backToPhoneBrandsButton = document.querySelector("#back-to-phone-brands");
const productAddButtons = Array.from(document.querySelectorAll(".product-add-button"));
let selectedBrandButton = null;

if (!categorySearch || !categoryGrid || !emptyMessage) {
  throw new Error("Category search elements are required.");
}

const categoryCards = categoryGrid.querySelectorAll(".category-card");

function resetPhoneBrandSelection() {
  phoneBrandList.hidden = false;
  brandProducts.hidden = true;
  phoneProductGrid.hidden = false;
  brandEmptyMessage.hidden = true;
  selectedBrandHeading.textContent = "";
  phoneBrandButtons.forEach((button) => button.setAttribute("aria-expanded", "false"));
  selectedBrandButton = null;
}

function setSmartPhonesOpen(isOpen) {
  resetPhoneBrandSelection();
  smartPhonesProducts.hidden = !isOpen;
  smartPhonesCategory.setAttribute("aria-expanded", String(isOpen));
  if (isOpen) {
    smartPhonesProducts.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

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
  if (smartPhonesCategory.hidden) setSmartPhonesOpen(false);
});

smartPhonesCategory.addEventListener("click", () => {
  setSmartPhonesOpen(smartPhonesProducts.hidden);
});
smartPhonesCategory.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    setSmartPhonesOpen(smartPhonesProducts.hidden);
  }
});
closeSmartPhonesButton.addEventListener("click", () => setSmartPhonesOpen(false));

phoneBrandList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-brand]");
  if (!button) return;

  const brand = button.dataset.brand;
  selectedBrandButton = button;
  phoneBrandList.hidden = true;
  brandProducts.hidden = false;
  selectedBrandHeading.textContent = `${brand} phones`;
  button.setAttribute("aria-expanded", "true");

  const hasProducts = brand === "Samsung";
  phoneProductGrid.hidden = !hasProducts;
  brandEmptyMessage.hidden = hasProducts;
  if (!hasProducts) {
    brandEmptyMessage.textContent = `No ${brand} phones are listed yet.`;
  }
});

backToPhoneBrandsButton.addEventListener("click", () => {
  const previousBrandButton = selectedBrandButton;
  resetPhoneBrandSelection();
  if (previousBrandButton) previousBrandButton.focus();
});

const products = {
  "galaxy-a07-4-64": {
    name: "Samsung Galaxy A07",
    specification: "4 GB RAM / 64 GB storage",
    price: 52490
  },
  "galaxy-a07-6-128": {
    name: "Samsung Galaxy A07",
    specification: "6 GB RAM / 128 GB storage",
    price: 66490
  },
  "galaxy-a17-5g-8-128": {
    name: "Samsung Galaxy A17 5G",
    specification: "8 GB RAM / 128 GB storage",
    price: 95490
  },
  "galaxy-a17-5g-8-256": {
    name: "Samsung Galaxy A17 5G",
    specification: "8 GB RAM / 256 GB storage",
    price: 119990
  }
};
const cart = new Map();
const headerCart = document.querySelector("#header-cart");
const cartDrawer = document.querySelector("#cart-drawer");
const cartBackdrop = document.querySelector("#cart-backdrop");
const cartClose = document.querySelector("#cart-close");
const cartItems = document.querySelector("#cart-items");
const cartCount = document.querySelector("#cart-count");
const headerCartCount = document.querySelector("#header-cart-count");
const cartItemCount = document.querySelector("#cart-item-count");
const cartDeliveryFeeRow = document.querySelector("#cart-delivery-fee-row");
const cartDeliveryFee = document.querySelector("#cart-delivery-fee");
const cartTotalAmount = document.querySelector("#cart-total-amount");
const whatsappOrder = document.querySelector("#whatsapp-order");
const emailOrder = document.querySelector("#email-order");
const cartOrderNote = document.querySelector("#cart-order-note");
const orderDetailsForm = document.querySelector("#order-details-form");
const orderName = document.querySelector("#order-name");
const orderPhone = document.querySelector("#order-phone");
const orderAddress = document.querySelector("#order-address");
const orderDistrict = document.querySelector("#order-district");
const deliveryFee = 350;

function formatPrice(amount) {
  return amount.toLocaleString("en-LK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

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

function getProductsTotal() {
  return Array.from(cart.entries()).reduce((total, [productId, quantity]) => {
    return total + products[productId].price * quantity;
  }, 0);
}

function getTotalPrice() {
  return getProductsTotal() + (getTotalItems() > 0 ? deliveryFee : 0);
}

function getOrderMessage(customer) {
  const orderLines = Array.from(cart.entries()).map(([productId, quantity]) => {
    const product = products[productId];
    return `- ${product.name} (${product.specification}) x ${quantity}: LKR ${formatPrice(product.price * quantity)}`;
  });
  return [
    "Hello NCL Solutions, I would like to place an order:",
    "",
    `Name: ${customer.name}`,
    `Phone: ${customer.phone}`,
    `Area / district: ${customer.district}`,
    `Delivery address: ${customer.address}`,
    "",
    ...orderLines,
    "",
    `Items subtotal: LKR ${formatPrice(getProductsTotal())}`,
    `Delivery fee: LKR ${formatPrice(deliveryFee)}`,
    `Total: LKR ${formatPrice(getTotalPrice())}`
  ].join("\n");
}

function renderCart() {
  const totalItems = getTotalItems();
  cartCount.textContent = totalItems;
  headerCartCount.textContent = totalItems;
  cartItemCount.textContent = totalItems;
  cartDeliveryFeeRow.hidden = totalItems === 0;
  cartDeliveryFee.textContent = `LKR ${formatPrice(deliveryFee)}`;
  cartTotalAmount.textContent = `LKR ${formatPrice(getTotalPrice())}`;
  headerCart.classList.toggle("has-items", totalItems > 0);
  cartItems.replaceChildren();
  orderDetailsForm.hidden = totalItems === 0;
  whatsappOrder.hidden = totalItems === 0;
  emailOrder.hidden = totalItems === 0;
  whatsappOrder.disabled = totalItems === 0;
  emailOrder.disabled = totalItems === 0;
  cartOrderNote.hidden = totalItems === 0;
  cartOrderNote.textContent = `Delivery is LKR ${formatPrice(deliveryFee)} per order for all districts. Google Maps location access is not required.`;

  if (totalItems === 0) {
    orderDetailsForm.reset();
    requiredOrderInputs.forEach((input) => input.setCustomValidity(""));
    const emptyState = document.createElement("div");
    emptyState.className = "cart-empty";
    emptyState.innerHTML = "<span>0</span><p>Your cart is empty</p>";
    cartItems.appendChild(emptyState);
    return;
  }

  cart.forEach((quantity, productId) => {
    const product = products[productId];
    const item = document.createElement("article");
    item.className = "cart-item";
    const details = document.createElement("div");
    const name = document.createElement("strong");
    name.textContent = product.name;
    const specification = document.createElement("small");
    specification.textContent = product.specification;
    const price = document.createElement("small");
    price.textContent = `LKR ${formatPrice(product.price)} each`;
    details.append(name, specification, price);

    const actions = document.createElement("div");
    actions.className = "cart-item-actions";
    const decreaseButton = document.createElement("button");
    decreaseButton.type = "button";
    decreaseButton.dataset.action = "decrease";
    decreaseButton.dataset.productId = productId;
    decreaseButton.setAttribute("aria-label", `Decrease ${product.name}`);
    decreaseButton.textContent = "-";
    const quantityLabel = document.createElement("span");
    quantityLabel.textContent = quantity;
    const increaseButton = document.createElement("button");
    increaseButton.type = "button";
    increaseButton.dataset.action = "increase";
    increaseButton.dataset.productId = productId;
    increaseButton.setAttribute("aria-label", `Increase ${product.name}`);
    increaseButton.textContent = "+";
    actions.append(decreaseButton, quantityLabel, increaseButton);
    item.append(details, actions);
    cartItems.appendChild(item);
  });
}

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const productId = button.dataset.productId;
  const quantity = cart.get(productId) || 0;
  if (button.dataset.action === "increase") {
    cart.set(productId, quantity + 1);
  } else if (quantity <= 1) {
    cart.delete(productId);
  } else {
    cart.set(productId, quantity - 1);
  }
  renderCart();
});

productAddButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    const quantity = cart.get(productId) || 0;
    cart.set(productId, quantity + 1);
    renderCart();
    openCart();
  });
});

const requiredOrderInputs = [orderName, orderPhone, orderAddress];
requiredOrderInputs.forEach((input) => {
  input.addEventListener("input", () => {
    input.setCustomValidity(input.value.trim() ? "" : "Please enter a valid value.");
  });
});

function submitOrder(channel) {
  requiredOrderInputs.forEach((input) => {
    input.setCustomValidity(input.value.trim() ? "" : "Please enter a valid value.");
  });
  if (!orderDetailsForm.reportValidity()) return;

  const customer = {
    name: orderName.value.trim(),
    phone: orderPhone.value.trim(),
    address: orderAddress.value.trim(),
    district: orderDistrict.value
  };
  const message = getOrderMessage(customer);
  if (channel === "whatsapp") {
    window.open(`https://wa.me/94779273876?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  } else {
    window.location.href = `mailto:lakshancreations26@gmail.com?subject=${encodeURIComponent("Order from NCL Solutions")}&body=${encodeURIComponent(message)}`;
  }
}

whatsappOrder.addEventListener("click", () => submitOrder("whatsapp"));
emailOrder.addEventListener("click", () => submitOrder("email"));

const reviewForm = document.querySelector("#review-form");
  const reviewComment = document.querySelector("#review-comment");
  const reviewSubmit = document.querySelector("#review-submit");
  const reviewFormStatus = document.querySelector("#review-form-status");
  const reviewLoadStatus = document.querySelector("#reviews-load-status");
  const reviewList = document.querySelector("#review-list");
  const reviewsAverage = document.querySelector("#reviews-average");
  const reviewsAverageStars = document.querySelector("#reviews-average-stars");
  const reviewsTotal = document.querySelector("#reviews-total");
  const reviewCharacterCount = document.querySelector("#review-character-count");
  const ratingButtons = Array.from(document.querySelectorAll(".rating-star"));
  const reviewSetupNotice = document.querySelector("#review-setup-notice");
  const reviewConfig = window.NCL_REVIEWS_CONFIG || {};
  const reviewsUrl = typeof reviewConfig.projectUrl === "string" ? reviewConfig.projectUrl.trim().replace(/\/+$/, "") : "";
  const reviewsKey = typeof reviewConfig.anonKey === "string" ? reviewConfig.anonKey.trim() : "";
  let selectedRating = 0;

  function setReviewFormStatus(message, kind) {
    reviewFormStatus.textContent = message;
    reviewFormStatus.className = `review-form-status${kind ? ` ${kind}` : ""}`;
  }

  function updateSelectedRating(rating) {
    selectedRating = rating;
    ratingButtons.forEach((button) => {
      const isSelected = Number(button.dataset.rating) <= rating;
      button.classList.toggle("selected", isSelected);
      button.setAttribute("aria-pressed", String(Number(button.dataset.rating) === rating));
    });
  }

  function renderReviews(reviews) {
    reviewList.replaceChildren();
    const total = reviews.length;
    const average = total
      ? reviews.reduce((sum, review) => sum + Number(review.rating), 0) / total
      : 0;
    const roundedRating = Math.round(average);

    reviewsAverage.textContent = total ? average.toFixed(1) : "—";
    reviewsAverageStars.textContent = `${"★".repeat(roundedRating)}${"☆".repeat(5 - roundedRating)}`;
    reviewsAverageStars.setAttribute("aria-label", total ? `${average.toFixed(1)} out of 5 stars` : "No ratings yet");
    reviewsTotal.textContent = `${total} ${total === 1 ? "review" : "reviews"}`;

    if (total === 0) {
      reviewList.innerHTML = '<p class="no-reviews">No reviews yet. Be the first to share your experience.</p>';
      return;
    }

    reviews.forEach((review) => {
      const card = document.createElement("article");
      card.className = "review-card";

      const header = document.createElement("div");
      header.className = "review-card-header";

      const stars = document.createElement("span");
      stars.className = "review-card-stars";
      stars.textContent = `${"★".repeat(Number(review.rating))}${"☆".repeat(5 - Number(review.rating))}`;
      stars.setAttribute("aria-label", `${review.rating} out of 5 stars`);

      const date = document.createElement("time");
      const createdAt = new Date(review.created_at);
      date.textContent = Number.isNaN(createdAt.getTime()) ? "" : createdAt.toLocaleDateString();
      if (!Number.isNaN(createdAt.getTime())) date.dateTime = createdAt.toISOString();

      const comment = document.createElement("p");
      comment.className = "review-card-comment";
      comment.textContent = review.comment;

      header.append(stars, date);
      card.append(header, comment);
      reviewList.appendChild(card);
    });
  }

  async function loadReviews() {
    if (!reviewsUrl || !reviewsKey) {
      reviewForm.hidden = true;
      reviewSetupNotice.hidden = false;
      reviewLoadStatus.textContent = "";
      renderReviews([]);
      reviewList.querySelector(".no-reviews").textContent = "Customer reviews will appear here once the review service is connected.";
      return;
    }

    reviewForm.hidden = false;
    reviewSetupNotice.hidden = true;

    try {
      const response = await fetch(
        `${reviewsUrl}/rest/v1/website_reviews?select=id,rating,comment,created_at&order=created_at.desc&limit=100`,
        {
          headers: {
            apikey: reviewsKey,
            Authorization: `Bearer ${reviewsKey}`
          }
        }
      );

      if (!response.ok) throw new Error(`Reviews request failed (${response.status}).`);

      const reviews = await response.json();
      if (!Array.isArray(reviews)) throw new Error("Reviews response was invalid.");
      renderReviews(reviews);
      reviewLoadStatus.textContent = "";
    } catch (error) {
      reviewLoadStatus.textContent = "Could not load reviews right now. Please try again later.";
      console.error("Could not load reviews:", error);
    }
  }

  ratingButtons.forEach((button) => {
    button.addEventListener("click", () => updateSelectedRating(Number(button.dataset.rating)));
  });

  reviewComment.addEventListener("input", () => {
    reviewCharacterCount.textContent = `${reviewComment.value.length} / 500`;
  });

  reviewForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const comment = reviewComment.value.trim();

    if (!reviewsUrl || !reviewsKey) {
      setReviewFormStatus("Review submissions are not available yet.", "error");
      return;
    }
    if (selectedRating < 1 || selectedRating > 5) {
      setReviewFormStatus("Please choose a star rating.", "error");
      return;
    }
    if (comment.length < 3 || comment.length > 500) {
      setReviewFormStatus("Your comment must be between 3 and 500 characters.", "error");
      return;
    }

    reviewSubmit.disabled = true;
    setReviewFormStatus("Submitting your review...", "");

    try {
      const response = await fetch(`${reviewsUrl}/rest/v1/website_reviews`, {
        method: "POST",
        headers: {
          apikey: reviewsKey,
          Authorization: `Bearer ${reviewsKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal"
        },
        body: JSON.stringify({ rating: selectedRating, comment })
      });

      if (!response.ok) {
        const details = await response.text();
        throw new Error(`Review submission failed (${response.status}): ${details}`);
      }

      reviewForm.reset();
      reviewCharacterCount.textContent = "0 / 500";
      updateSelectedRating(0);
      setReviewFormStatus("Thanks! Your review is now visible to other visitors.", "success");
      await loadReviews();
    } catch (error) {
      setReviewFormStatus("Could not submit your review. Please try again.", "error");
      console.error("Could not submit review:", error);
    } finally {
      reviewSubmit.disabled = false;
    }
  });

  loadReviews();

headerCart.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
cartBackdrop.addEventListener("click", closeCart);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeCart();
});

renderCart();

const snowfall = document.querySelector("#snowfall");
if (snowfall) {
  const snowflakeCount = window.matchMedia("(max-width: 560px)").matches ? 35 : 55;
  for (let index = 0; index < snowflakeCount; index += 1) {
    const flake = document.createElement("span");
    flake.className = "snowflake";
    flake.style.setProperty("--left", `${Math.random() * 100}%`);
    flake.style.setProperty("--size", `${3 + Math.random() * 7}px`);
    flake.style.setProperty("--opacity", `${0.35 + Math.random() * 0.55}`);
    flake.style.setProperty("--duration", `${7 + Math.random() * 11}s`);
    flake.style.setProperty("--delay", `${-Math.random() * 18}s`);
    flake.style.setProperty("--drift", `${-55 + Math.random() * 110}px`);
    snowfall.appendChild(flake);
  }
}

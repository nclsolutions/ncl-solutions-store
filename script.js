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
      reviewLoadStatus.textContent = "Reviews will appear here once the review service is set up.";
      reviewFormStatus.textContent = "Review submissions are not available yet.";
      reviewComment.disabled = true;
      reviewSubmit.disabled = true;
      ratingButtons.forEach((button) => { button.disabled = true; });
      renderReviews([]);
      return;
    }

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

checkoutButton.addEventListener("click", () => {
  alert(`Order has ${getTotalItems()} item(s).`);
});

renderCart();

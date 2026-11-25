const categorySearch = document.querySelector("#category-search");
const categoryGrid = document.querySelector("#category-grid");
const emptyMessage = document.querySelector("#category-empty");
const smartPhonesCategory = document.querySelector("#smart-phones-category");
const smartPhonesProducts = document.querySelector("#smart-phones-products");
const casesCoversCategory = document.querySelector("#cases-covers-category");
const casesCoversProducts = document.querySelector("#cases-covers-products");
const closeSmartPhonesButton = document.querySelector("#close-smart-phones");
const closeCasesCoversButton = document.querySelector("#close-cases-covers");
const phoneBrandList = document.querySelector("#phone-brand-list");
const phoneBrandButtons = Array.from(phoneBrandList.querySelectorAll(".phone-brand-button"));
const brandProducts = document.querySelector("#brand-products");
const selectedBrandHeading = document.querySelector("#selected-brand-heading");
const brandEmptyMessage = document.querySelector("#brand-empty-message");
const phoneProductGrid = document.querySelector("#phone-product-grid");
const backToPhoneBrandsButton = document.querySelector("#back-to-phone-brands");
const caseBrandList = document.querySelector("#case-brand-list");
let caseBrandButtons = [];
const caseBrandProducts = document.querySelector("#case-brand-products");
const selectedCaseBrandHeading = document.querySelector("#selected-case-brand-heading");
const caseProductGrid = document.querySelector("#case-product-grid");
const backToCaseBrandsButton = document.querySelector("#back-to-case-brands");
const productAddButtons = Array.from(document.querySelectorAll("button.product-add-button"));
let selectedBrandButton = null;
let selectedCaseBrandButton = null;

if (!categorySearch || !categoryGrid || !emptyMessage) {
  throw new Error("Category search elements are required.");
}

const categoryCards = categoryGrid.querySelectorAll(".category-card");
const productCards = Array.from(phoneProductGrid.querySelectorAll(".product-card"));
const caseCatalog = {
  Apple: [
    "iPhone 14",
    "iPhone 15",
    "iPhone 16",
    "iPhone 16 Plus",
    "iPhone 16 Pro",
    "iPhone 16 Pro Max",
    "iPhone 16e",
    "iPhone 17",
    "iPhone 17 Pro",
    "iPhone 17 Pro Max",
    "iPhone 17e",
    "iPhone Air"
  ],
  Asus: ["ROG Phone 9 Pro", "Zenfone 12 Ultra"],
  Blackview: ["Wave 10C"],
  Google: [
    "Pixel 7",
    "Pixel 7 Pro",
    "Pixel 8",
    "Pixel 8a",
    "Pixel 9",
    "Pixel 9 Pro",
    "Pixel 9 Pro XL",
    "Pixel 9a",
    "Pixel 10",
    "Pixel 10 Pro",
    "Pixel 10 Pro XL",
    "Pixel 10a",
    "Pixel 11"
  ],
  Honor: [
    "200",
    "200 Smart",
    "400",
    "400 Lite",
    "400 Pro",
    "600",
    "600 Lite",
    "600 Pro",
    "Magic 6 Pro",
    "Magic 7 Pro",
    "Magic V5",
    "Play 10",
    "X5C",
    "X5C Plus",
    "X5d",
    "X5d Plus",
    "X6C",
    "X7D 5G",
    "X8C",
    "X8D",
    "X9D",
    "X9E Pro"
  ],
  Huawei: ["Mate X6", "Nova 13", "Nova 13 Pro", "Pura 70 Pro"],
  Infinix: [
    "Hot 60i",
    "Hot 60 Pro",
    "Hot 60 Pro Plus",
    "Note 60 5G",
    "Note 60 Ultra 5G",
    "Note Edge 5G",
    "Smart 20"
  ],
  Itel: ["A200"],
  KXD: ["K30"],
  Motorola: [
    "Edge 60",
    "Edge 60 Fusion",
    "Edge 60 Pro",
    "Moto G56 5G",
    "Moto G86 5G"
  ],
  Nokia: ["G42 5G", "X30 5G"],
  Nothing: ["Phone 3", "Phone 3a", "Phone 3a Pro"],
  OPPO: [
    "A5 Pro 5G",
    "A5x 5G",
    "Reno14 5G",
    "Reno14 F 5G",
    "Reno14 Pro 5G"
  ],
  OnePlus: [
    "13R",
    "13S 5G",
    "14R",
    "15 5G",
    "15R 5G",
    "Nord 6",
    "Nord CE6"
  ],
  POCO: ["F7", "F7 Pro", "F7 Ultra", "X7 5G", "X7 Pro 5G"],
  Redmi: [
    "15 4G",
    "15 5G",
    "15C 5G",
    "A4 5G",
    "Note 15 Pro 4G",
    "Note 15 Pro 5G",
    "Note 17",
    "Note 17 4G",
    "Note 17 5G",
    "Note 17 Pro 5G",
    "Note 17 Pro Max 5G"
  ],
  Realme: [
    "14 5G",
    "14 Pro 5G",
    "14 Pro+ 5G",
    "C75",
    "GT 7 Pro"
  ],
  Samsung: [
    "Galaxy A06 4G",
    "Galaxy A07 4G",
    "Galaxy A07 5G",
    "Galaxy A07s",
    "Galaxy A08",
    "Galaxy A17 4G",
    "Galaxy A17 5G",
    "Galaxy A26 5G",
    "Galaxy A27 5G",
    "Galaxy A36 5G",
    "Galaxy A37 5G",
    "Galaxy A56 5G",
    "Galaxy A57 5G",
    "Galaxy F70e 5G",
    "Galaxy M06 5G",
    "Galaxy M17",
    "Galaxy M17E 5G",
    "Galaxy S24",
    "Galaxy S25",
    "Galaxy S25+",
    "Galaxy S25 FE",
    "Galaxy S25 Ultra",
    "Galaxy S26",
    "Galaxy S26+ 5G",
    "Galaxy S26 FE",
    "Galaxy S26 Ultra",
    "Galaxy Z Flip6",
    "Galaxy Z Flip7 5G",
    "Galaxy Z Flip8 5G",
    "Galaxy Z Fold7 5G",
    "Galaxy Z Fold8 5G",
    "Galaxy Z Fold8 Ultra 5G"
  ],
  Sony: ["Xperia 1 VII", "Xperia 10 VII"],
  TCL: ["60 NXTPAPER", "60 SE"],
  Tecno: [
    "Camon 40",
    "Camon 40 Pro 5G",
    "Pova 7",
    "Pova 7 Pro 5G",
    "Spark 40"
  ],
  Xiaomi: [
    "14 Ultra",
    "15 Ultra 5G",
    "17T",
    "Note 15 Pro Plus 5G"
  ],
  Vivo: ["V50 5G", "V60 5G", "X200 FE", "Y29", "Y39 5G"],
  ZTE: ["Blade A31 Lite", "Blade A5 2020", "Blade A36e", "Blade A56"]
};
const caseModels = Object.entries(caseCatalog).flatMap(([brand, models]) =>
  models.map((name) => ({
    brand,
    name,
    stockOut: brand === "Samsung" && name === "Galaxy Z Fold7 5G"
  }))
);

Object.keys(caseCatalog).sort((first, second) => first.localeCompare(second)).forEach((brand) => {
  const button = document.createElement("button");
  button.className = "phone-brand-button case-brand-button";
  button.type = "button";
  button.dataset.caseBrand = brand;
  button.setAttribute("aria-controls", "case-brand-products");
  button.setAttribute("aria-expanded", "false");
  button.textContent = brand;
  caseBrandList.appendChild(button);
});
caseBrandButtons = Array.from(caseBrandList.querySelectorAll(".case-brand-button"));

caseModels.forEach((model) => {
  const card = document.createElement("article");
  card.className = "product-card";
  card.dataset.brand = model.brand;

  const image = document.createElement("img");
  image.src = "assets/phone-cases.jpg";
  image.alt = `${model.brand} ${model.name} back-cover styles`;

  const details = document.createElement("div");
  details.className = "product-card-details";
  const eyebrow = document.createElement("p");
  eyebrow.className = "product-card-eyebrow";
  eyebrow.textContent = `${model.brand.toUpperCase()} BACK COVER`;
  const stockStatus = document.createElement("p");
  stockStatus.className = "product-stock-status";
  stockStatus.textContent = "Stock Out";
  stockStatus.hidden = !model.stockOut;
  const name = document.createElement("h4");
  name.textContent = model.name;
  const specification = document.createElement("p");
  specification.className = "product-specification";
  specification.textContent = `Back cover made for ${model.brand} ${model.name}`;
  const price = document.createElement("p");
  price.className = "product-price";
  price.textContent = "LKR 500–1,000";
  const enquiry = document.createElement("a");
  enquiry.className = "product-add-button";
  enquiry.href = `https://wa.me/94779273876?text=${encodeURIComponent(`Hi, I’m interested in a ${model.brand} ${model.name} back cover. Please confirm the available styles and exact price.`)}`;
  enquiry.target = "_blank";
  enquiry.rel = "noopener noreferrer";
  enquiry.textContent = "Enquire on WhatsApp";

  details.append(eyebrow, stockStatus, name, specification, price, enquiry);
  card.append(image, details);
  caseProductGrid.appendChild(card);
});

const caseProductCards = Array.from(caseProductGrid.querySelectorAll(".product-card"));

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

function resetCaseBrandSelection() {
  caseBrandList.hidden = false;
  caseBrandProducts.hidden = true;
  caseProductGrid.hidden = false;
  selectedCaseBrandHeading.textContent = "";
  caseBrandButtons.forEach((button) => button.setAttribute("aria-expanded", "false"));
  selectedCaseBrandButton = null;
}

function setCasesCoversOpen(isOpen) {
  resetCaseBrandSelection();
  casesCoversProducts.hidden = !isOpen;
  casesCoversCategory.setAttribute("aria-expanded", String(isOpen));
  if (isOpen) {
    casesCoversProducts.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

categorySearch.addEventListener("input", () => {
  const query = categorySearch.value.trim().toLowerCase().replace(/\s+/g, " ");
  let visibleCategoryCount = 0;

  categoryCards.forEach((card) => {
    const categoryName = card.querySelector("h3").textContent.trim().toLowerCase();
    const matches = categoryName.includes(query);
    card.hidden = !matches;
    if (matches) visibleCategoryCount += 1;
  });

  let matchingProductCount = 0;
  productCards.forEach((card) => {
    const productDetails = card.querySelector(".product-card-details").textContent.toLowerCase().replace(/\s+/g, " ");
    const matches = Boolean(query) && productDetails.includes(query);
    card.hidden = Boolean(query) && !matches;
    if (matches) matchingProductCount += 1;
  });

  let matchingCaseProductCount = 0;
  caseProductCards.forEach((card) => {
    const productDetails = card.querySelector(".product-card-details").textContent.toLowerCase().replace(/\s+/g, " ");
    const matches = Boolean(query) && productDetails.includes(query);
    card.hidden = Boolean(query) && !matches;
    if (matches) matchingCaseProductCount += 1;
  });

  if (matchingProductCount > 0) {
    smartPhonesCategory.hidden = false;
    resetPhoneBrandSelection();
    smartPhonesProducts.hidden = false;
    smartPhonesCategory.setAttribute("aria-expanded", "true");
    phoneBrandList.hidden = true;
    brandProducts.hidden = false;
    selectedBrandHeading.textContent = "Search results";
  } else {
    resetPhoneBrandSelection();
    if (query && smartPhonesProducts.hidden === false) setSmartPhonesOpen(false);
  }

  if (matchingCaseProductCount > 0) {
    casesCoversCategory.hidden = false;
    resetCaseBrandSelection();
    casesCoversProducts.hidden = false;
    casesCoversCategory.setAttribute("aria-expanded", "true");
    caseBrandList.hidden = true;
    caseBrandProducts.hidden = false;
    selectedCaseBrandHeading.textContent = "Back-cover search results";
  } else {
    resetCaseBrandSelection();
    if (query) setCasesCoversOpen(false);
  }

  emptyMessage.hidden = visibleCategoryCount > 0 || matchingProductCount > 0 || matchingCaseProductCount > 0;
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
casesCoversCategory.addEventListener("click", () => {
  setCasesCoversOpen(casesCoversProducts.hidden);
});
casesCoversCategory.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    setCasesCoversOpen(casesCoversProducts.hidden);
  }
});
closeCasesCoversButton.addEventListener("click", () => setCasesCoversOpen(false));
caseBrandList.addEventListener("click", (event) => {
  const button = event.target.closest(".case-brand-button");
  if (!button) return;

  selectedCaseBrandButton = button;
  const brand = button.dataset.caseBrand;
  caseBrandList.hidden = true;
  caseBrandProducts.hidden = false;
  selectedCaseBrandHeading.textContent = `${brand} back covers`;
  button.setAttribute("aria-expanded", "true");
  caseProductCards.forEach((card) => {
    card.hidden = card.dataset.brand !== brand;
  });
});
backToCaseBrandsButton.addEventListener("click", () => {
  const previousBrandButton = selectedCaseBrandButton;
  resetCaseBrandSelection();
  if (previousBrandButton) previousBrandButton.focus();
});

phoneBrandList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-brand]");
  if (!button) return;

  const brand = button.dataset.brand;
  selectedBrandButton = button;
  phoneBrandList.hidden = true;
  brandProducts.hidden = false;
  selectedBrandHeading.textContent = `${brand} phones`;
  button.setAttribute("aria-expanded", "true");

  let visibleProductCount = 0;
  phoneProductGrid.querySelectorAll(".product-card").forEach((card) => {
    const matchesBrand = card.dataset.brand === brand;
    card.hidden = !matchesBrand;
    if (matchesBrand) visibleProductCount += 1;
  });

  const hasProducts = visibleProductCount > 0;
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
  },
  "galaxy-a37-5g-8-256": {
    name: "Samsung Galaxy A37 5G",
    specification: "8 GB RAM / 256 GB storage",
    price: 171990
  },
  "infinix-smart-20-8-128": {
    name: "Infinix Smart 20",
    specification: "8 GB RAM / 128 GB storage",
    price: 62490
  },
  "infinix-smart-20-8-64": {
    name: "Infinix Smart 20",
    specification: "8 GB RAM / 64 GB storage",
    price: 52490
  },
  "itel-a200-8-128": {
    name: "Itel A200",
    specification: "8 GB RAM / 128 GB storage",
    price: 42490
  },
  "zte-blade-a56-12-128": {
    name: "ZTE Blade A56",
    specification: "12 GB RAM / 128 GB storage",
    price: 51490
  },
  "zte-blade-a36e-6-64": {
    name: "ZTE Blade A36e",
    specification: "6 GB RAM / 64 GB storage",
    price: 38490
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
    flake.style.setProperty("--size", `${8 + Math.random() * 11}px`);
    flake.style.setProperty("--opacity", `${0.45 + Math.random() * 0.5}`);
    flake.style.setProperty("--duration", `${8 + Math.random() * 13}s`);
    flake.style.setProperty("--delay", `${-Math.random() * 18}s`);
    flake.style.setProperty("--drift", `${-75 + Math.random() * 150}px`);
    flake.textContent = index % 3 === 0 ? "\u2744" : "\u2733";
    snowfall.appendChild(flake);
  }
}

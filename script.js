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

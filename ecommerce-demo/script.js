const products = [
  {
    title: "Product 1",
    price: "$19.99",
    image: "images/product1.jpg",
    description: "A stylish item perfect for daily use."
  },
  {
    title: "Product 2",
    price: "$29.99",
    image: "images/product2.jpg",
    description: "High-quality product with great features."
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach((card, index) => {
    card.addEventListener("click", () => openModal(products[index]));
  });
});

function openModal(product) {
  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalTitle").textContent = product.title;
  document.getElementById("modalPrice").textContent = product.price;
  document.getElementById("modalDescription").textContent = product.description;
  document.getElementById("productModal").classList.remove("hidden");
  document.getElementById("productModal").classList.add("flex");
}

function closeModal() {
  document.getElementById("productModal").classList.remove("flex");
  document.getElementById("productModal").classList.add("hidden");
}

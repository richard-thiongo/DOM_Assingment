// Find the total price shown on the page.
const totalPrice = document.querySelector(".total");

// Find all of the product cards in the shopping cart.
const products = document.querySelectorAll(".list-products > .card-body");

// Add the prices of all products in the cart.
function calculateTotal() {
  let total = 0;

  for (let i = 0; i < products.length; i++) {
    const productCard = products[i].querySelector(".card");

    // A deleted product no longer has a card.
    if (productCard !== null) {
      const priceText = productCard.querySelector(".unit-price").textContent;
      const price = Number(priceText.replace("$", "").trim());
      const quantity = Number(
        productCard.querySelector(".quantity").textContent
      );

      total = total + price * quantity;
    }
  }

  totalPrice.textContent = total + " $";
}

// Add click events to the buttons for each product.
for (let i = 0; i < products.length; i++) {
  const productCard = products[i].querySelector(".card");
  const increaseButton = productCard.querySelector(".fa-plus-circle");
  const decreaseButton = productCard.querySelector(".fa-minus-circle");
  const deleteButton = productCard.querySelector(".fa-trash-alt");
  const likeButton = productCard.querySelector(".fa-heart");
  const quantityText = productCard.querySelector(".quantity");

  // Increase this product's quantity by one.
  increaseButton.addEventListener("click", function () {
    let quantity = Number(quantityText.textContent);
    quantity = quantity + 1;
    quantityText.textContent = quantity;
    calculateTotal();
  });

  // Decrease the quantity, but do not allow it to go below zero.
  decreaseButton.addEventListener("click", function () {
    let quantity = Number(quantityText.textContent);

    if (quantity > 0) {
      quantity = quantity - 1;
      quantityText.textContent = quantity;
    }

    calculateTotal();
  });

  // Remove this product from the cart.
  deleteButton.addEventListener("click", function () {
    products[i].remove();
    calculateTotal();
  });

  // Turn the heart red when liked, and black when unliked.
  likeButton.addEventListener("click", function () {
    if (likeButton.classList.contains("liked")) {
      likeButton.classList.remove("liked");
    } else {
      likeButton.classList.add("liked");
    }
  });
}

// Show the correct total when the page first loads.
calculateTotal();

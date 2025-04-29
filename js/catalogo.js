fetch("../productos/productos.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error al cargar los productos");
    }
    return response.json();
  })
  .then((data) => {
    const productList = document.getElementById("productos");

    data.products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.className = "product";

      productDiv.innerHTML = `
          <img src="${product.image_url}" alt="${product.name}">
          <div class="product-name">${product.name}</div>
          <div class="product-price">$${product.price}</div>
          <div class="product-description">${product.description}</div>
          <button class="add-to-cart">Agregar al carrito</button>
            `;

      const addToCartButton = productDiv.querySelector(".add-to-cart");
      addToCartButton.addEventListener("click", () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Verificar si el producto ya existe en el carrito
        const existingProduct = cart.find((item) => item.name === product.name);

        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          cart.push({
            name: product.name,
            price: product.price,
            description: product.description,
            image_url: product.image_url,
            quantity: 1,
          });
        }
        localStorage.setItem("cart", JSON.stringify(cart));

        alertify.alert(
          "Importante!",
          `${product.name} ha sido agregado al carrito.`,
          function () {
            alertify.success("Ok");
          }
        );
      });

      productList.appendChild(productDiv);
    });
  })
  .catch((error) => {
    console.error("Hubo un problema con el fetch:", error);
  });
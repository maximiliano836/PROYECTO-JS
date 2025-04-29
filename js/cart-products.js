const cartContainer = document.getElementById('cart-products');

const cart = JSON.parse(localStorage.getItem('cart')) || [];

if (cart.length === 0) {
    cartContainer.innerHTML = '<p class="alert">El carrito está vacío.</p>';
} else {
    cart.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'cart-product';

        productDiv.innerHTML = `
            <img src="${product.image_url}" alt="${product.name}" class="cart-product-image">
            <div class="cart-product-details">
                <h3>${product.name}</h3>
                <p>Cantidad: ${product.quantity}</p>
                <p>Precio: $${product.price * product.quantity}</p>
                <p>${product.description}</p>
            </div>
        `;

        cartContainer.appendChild(productDiv);
    });
}
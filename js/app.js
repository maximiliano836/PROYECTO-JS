checkbox_franquicia = document.getElementById("franquicia");
checkbox_importacion = document.getElementById("importacion");
button = document.getElementById("button");
tipo_franquicia = document.getElementById("tipo_franquicia");
resultado = document.getElementById("resultado");
precio_final_productos = document.getElementById("precio_final_productos");
precio_final_envio = document.getElementById("precio_final_envio");

let info_div = document.createElement("div");
let shippingtype = "";

let precio_items = 0;
let precio_envio = 0;
let precio_final = 0;


document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    precio_items = cart.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);

    precio_final_productos.innerHTML = "$" + precio_items;

    precio_envio = Math.round(precio_items * 0.2);

    precio_final_envio.innerHTML = "$" + precio_envio;
  });

checkbox_franquicia.addEventListener("change", function () {
  if (this.checked) {
    checkbox_importacion.checked = false;
  }
  info_div.innerHTML =
    "<p>Cuentas con 3 compras al exterior bajo la modalidad de franquicia, en cada una de ellas puedes traer hasta un máximo de USD 200</p>";
  tipo_franquicia.appendChild(info_div);
  shippingtype = "franquicia";
});

checkbox_importacion.addEventListener("change", function () {
  if (this.checked) {
    checkbox_franquicia.checked = false;
  }
  info_div.innerHTML =
    "<p>Si ya utilizaste las 3 compras ó si el valor de los productos supera los USD 200, deberás enviar la compra mediante importación, donde deberás pagar un impuesto del 60% sobre el valor de los productos.</p>";
  tipo_franquicia.appendChild(info_div);
  shippingtype = "importacion";
});

button.addEventListener("click", function () {
  if (checkbox_franquicia.checked) {
    if (precio_items > 200) {
      resultado.innerHTML =
        '<p class="error">El precio de los items supera los USD 200, por lo que no se puede realizar el envío por franquicia</p>';
      return;
    } else {
      precio_final = Math.round(precio_items + precio_envio);
      resultado.innerHTML = `<p class="resultado">El precio total es: ${precio_final}</p>`;
    }
  } else if (checkbox_importacion.checked) {
    precio_final = Math.round(precio_items * 1.6 + precio_envio);
    resultado.innerHTML = `<p class="resultado">El precio total es: ${precio_final}</p>`;
  } else {
    resultado.innerHTML =
      '<p class="error">Por favor seleccione un tipo de envío</p>';
    return;
  }
});

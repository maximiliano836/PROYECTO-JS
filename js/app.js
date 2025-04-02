checkbox_franquicia = document.getElementById('franquicia')
checkbox_importacion = document.getElementById('importacion')
button = document.getElementById('button')
tipo_franquicia = document.getElementById('tipo_franquicia');
resultado = document.getElementById('resultado');
let info_div = document.createElement('div');
let shippingtype = "";


checkbox_franquicia.addEventListener('change', function() {
    if (this.checked) {
        checkbox_importacion.checked = false;
    }
    info_div.innerHTML = '<p>Cuentas con 3 compras al exterior bajo la modalidad de franquicia, en cada una de ellas puedes traer hasta un máximo de USD 200</p>';
    tipo_franquicia.appendChild(info_div);
    shippingtype = 'franquicia';
});

checkbox_importacion.addEventListener('change', function() {
    if (this.checked) {
        checkbox_franquicia.checked = false;
    }
    info_div.innerHTML = '<p>Si ya utilizaste las 3 compras ó si el valor de los productos supera los USD 200, deberás enviar la compra mediante importación, donde deberás pagar un impuesto del 60% sobre el valor de los productos.</p>';
    tipo_franquicia.appendChild(info_div);
    shippingtype = 'importacion';
});

button.addEventListener('click', function() {
    let precio_items = parseFloat(document.getElementById('precio').value);
    let precio_envio = parseFloat(document.getElementById('envio').value);
    let precio_final = 0;

    console.log(precio_items)
    console.log(precio_envio)

    if (precio_items === 0 || isNaN(precio_items)){
        resultado.innerHTML = '<p class="error">Por favor ingrese un precio de los productos</p>';
        return;
    }

    if (precio_envio === 0 || isNaN(precio_envio)){
        resultado.innerHTML = '<p class="error">Por favor ingrese un precio de envío</p>';
        return;
    }

    if (checkbox_franquicia.checked){
        if (precio_items > 200){
            resultado.innerHTML = '<p class="error">El precio de los items supera los USD 200, por lo que no se puede realizar el envío por franquicia</p>';
            return;
        }
        else{
            precio_final = precio_items + precio_envio;
            resultado.innerHTML = `<p class="resultado">El precio total es: ${precio_final}</p>`;
        }
    }
    else if (checkbox_importacion.checked){
        precio_final = (precio_items * 1.6) + precio_envio;
        resultado.innerHTML = `<p class="resultado">El precio total es: ${precio_final}</p>`;

    }
    else{
        resultado.innerHTML = '<p class="error">Por favor seleccione un tipo de envío</p>';
        return;
    }

    if (!localStorage.getItem('historial')) {
        localStorage.setItem('historial', JSON.stringify([]));
    }

    const historial = JSON.parse(localStorage.getItem('historial'));
    historial.push({
        precio_items,
        precio_envio,
        shippingtype,
        precio_final,
        fecha: new Date().toLocaleString()
    });
    localStorage.setItem('historial', JSON.stringify(historial));
    mostrarHistorial();
})


function mostrarHistorial() {
    const historial = JSON.parse(localStorage.getItem('historial'));
    const historialContainer = document.getElementById('historial');
    historialContainer.innerHTML = ''; 

    historial.forEach(entry => {
        const item = document.createElement('li');
        item.innerHTML = `
            <p>Fecha: ${entry.fecha}</p>
            <p>Precio de los productos: USD ${entry.precio_items}</p>
            <p>Precio del envío: USD ${entry.precio_envio}</p>
            <p>Tipo de envío: ${entry.shippingtype}</p>
            <p>Precio total: USD ${entry.precio_final}</p>
            <hr>
        `;
        historialContainer.appendChild(item);
    });
}

document.addEventListener('DOMContentLoaded', mostrarHistorial);
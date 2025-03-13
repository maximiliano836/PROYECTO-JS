checkbox_franquicia = document.getElementById('franquicia')
checkbox_importacion = document.getElementById('importacion')
button = document.getElementById('button')

button.addEventListener('click', function() {
    let precio_items = parseFloat(document.getElementById('precio').value);
    let precio_envio = parseFloat(document.getElementById('envio').value);

    console.log(precio_items)
    console.log(precio_envio)

    if (precio_items == 0 || isNaN(precio_items)){
        alert('Por favor ingrese un precio de los productos');
        return;
    }

    if (precio_envio == 0 || isNaN(precio_envio)){
        alert('Por favor ingrese un precio de envío');
        return;
    }

    checkbox_franquicia.addEventListener('change', function() {
        if (this.checked) {
            checkbox_importacion.checked = false;
        }
    });
    
    checkbox_importacion.addEventListener('change', function() {
        if (this.checked) {
            checkbox_franquicia.checked = false;
        }
    });

    if (checkbox_franquicia.checked){
        if (precio_items > 200){
            alert(`El precio de los items supera los USD 200, por lo que no se puede realizar el envío por franquicia`);
            return;
        }
        else{
            let precio_final = (precio_items * 1.5) + precio_envio;
            alert(`El precio total es: ${precio_final}`);
        }
    }
    else if (checkbox_importacion.checked){
        let precio_final = (precio_items * 1.6) + precio_envio;
        alert(`El precio total es: ${precio_final}`);
    }
    else{
        alert('Por favor seleccione un tipo de envío');
    }
})
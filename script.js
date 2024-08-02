const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const comprarBtn = document.getElementById('comprar');




cargarEventListeners();

function cargarEventListeners() {
    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);    
    comprarBtn.addEventListener('click', hacerCompra);
}

function hacerCompra(e) {
    e.preventDefault();

    // Obtener todos los elementos dentro de la lista del carrito
    const elementosCarrito = lista.querySelectorAll('tr');
    let mensaje = "Hola angala, me interesan estas plataformas:\n\n";

    // Iterar sobre cada elemento del carrito
    elementosCarrito.forEach((elemento, index) => {
        // Obtener el título del elemento actual
        const titulo = elemento.querySelector('td:nth-child(2)').textContent;
        // Agregar la plataforma al mensaje con su número de orden y un salto de línea
        mensaje += `${index + 1}. ${titulo}\n`;
    });

    // Número de teléfono de WhatsApp
    const numero = "+573054289013";

    // Generar el enlace web de WhatsApp con el mensaje formateado
    const linkWhatsapp = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    // Abrir el enlace en una nueva pestaña
    window.open(linkWhatsapp, '_blank');

    // Limpiar todos los datos del carrito después de la compra
    limpiarCarrito();
}


function limpiarCarrito() {
    // Obtener todos los elementos dentro de la lista del carrito
    const elementosCarrito = lista.querySelectorAll('tr');

    // Iterar sobre cada elemento del carrito y eliminarlo
    elementosCarrito.forEach(elemento => {
        elemento.remove();
    });
}







function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').innerHTML,
        id: elemento.querySelector('a').getAttribute('data-id')
    };
    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${elemento.imagen}" width=100 />
        </td>
        <td>
            ${elemento.titulo}
        </td>
        <td>
            ${elemento.precio}
        </td>
        <td>
            <a href="#" class="borrar" data-id="${elemento.id}">X</a>
        </td>
    `;
    lista.appendChild(row);    
}

function eliminarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar')) {
        const elemento = e.target.parentElement.parentElement;
        const elementoId = elemento.querySelector('a').getAttribute('data-id');
        elemento.remove();
        // Aquí podrías realizar acciones adicionales, como actualizar el total, etc.
    }
}
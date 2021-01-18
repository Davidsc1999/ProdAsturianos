//fichero que tiene las 2 funciones que se ejecutarán en el index.js

const fs = require('fs');

let cargarProductos = () => {
    let productos = [];
    if (fs.existsSync('productos.json'))
        productos = JSON.parse(fs.readFileSync('productos.json'), 'utf8');

    return productos;
}


function guardarProductos(arrayProductos) {
    if (arrayProductos !== null) {
        fs.writeFileSync('arrayProductos.json', JSON.stringify(arrayProductos));
    }
}

module.exports = {
    cargarProductos: cargarProductos,
    guardarProductos: guardarProductos
}
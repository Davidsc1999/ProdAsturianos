//fichero en el que se guarda los datos y tomamos las acciones para registrarlos, obtenerlos, borrarlos...

const express = require('express');
const fichUtils = require(__dirname + '/fichero_utils.js');

let app = express();
let productos = fichUtils.cargarProductos();

productos = [
    { id: 1, nombre: 'Picadillo de jabalí', precio: '4,95', descripcion: 'Auténtico picadillo elaborado con magro de jabalí y panceta de cerdo, de sabor exquisito y con un toque ligeramente picante' },
    { id: 2, nombre: 'Queso de cabra', precio: '1,99€', descripcion: '100% cabra asturiana' },
    { id: 3, nombre: 'Queso Gamoneu', precio: '11,20', descripcion: 'queso que puede ser elaborado con leche de vaca o cabra. Madura en cuevas naturales de Picos de Europa' },
    { id: 4, nombre: 'Queso de vaca', precio: '4,99€', descripcion: '50% vaca asturiana' }
];


fichUtils.guardarProductos(productos);


app.use(express.json());

app.get('/productos', (req, res) => {
    if (productos && productos.length > 0) {
        res.status(200).send({ ok: true, productos: productos });
    } else {
        res.status(500).send({ ok: false, error: 'No se encontraron productos' });
    }
});

app.get('/productos/:id', (req, res) => {
    let resultado = productos.filter(producto => producto.id == req.params['id']);

    if (resultado.length > 0) {
        res.status(200).send({ ok: true, resultado: resultado[0] });
    } else {
        res.status(400).send({ ok: false, error: 'Producto no encontrado' });
    }
});

app.post('/productos', (req, res) => {
    let nuevoProducto = {
        id: req.body.id,
        nombre: req.body.titulo,
        precio: req.body.precio,
        descripcion: req.body.descripcion
    }

    let existe = productos.filter(producto => producto.id == nuevoProducto.id);

    if (existe.length == 0) {
        productos.push(nuevoProducto);
        fichUtils.guardarProductos(productos),
            res.status(200).send({ ok: true });
    } else {
        res.status(400).send({ ok: false, error: 'Código repetido' });
    }
});

app.put('/productos/:id', (req, res) => {
    let existe = productos.filter(prod => prod.id == req.params['id']);

    if (existe.length > 0) {
        let producto = existe[0];
        producto.titulo = req.body.titulo;
        producto.precio = req.body.precio;
        producto.descripcion = req.body.descripcion;

        fichUtils.guardarProductos(producto);
        res.status(200).send({ ok: true });
    } else {
        res.status(400).send({ ok: false, error: 'Producto no encontrado' });
    }
});

app.delete('/productos/:id', (req, res) => {
    let filtrado = productos.filter(prod => prod.id != req.params['id']);
    if(filtrado.length != productos.length){
        productos = filtrado;
        fichUtils.guardarProductos(productos);
        res.status(200).send({ok:true});
    } else {
        res.status(400).send({ok: false, error: 'Producto no encontrado'});
    }
});


app.listen(8080);
// Importar dependencias
const express = require('express');

// Cargar Router
const router = express.Router();

// Importamos controlador
const InmuebleController = require('../../controllers/inmueble.controller');


// Definir rutas
router.get('/', InmuebleController.all);
router.get('/:id', InmuebleController.one);
router.post('/', InmuebleController.register);
router.put('/:id', InmuebleController.update);
router.delete('/:id', InmuebleController.erase);

module.exports = router
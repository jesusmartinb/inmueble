// Importar dependencias
const express = require('express');
const toCheck = require('../../helpers/validators');

// Cargar Router
const router = express.Router();

// Importamos controlador
const InmuebleController = require('../../controllers/inmueble.controller');


// Definir rutas
router.get('/', InmuebleController.all);
router.get('/list/:page?', InmuebleController.allPaginate);
router.get('/:id', InmuebleController.one);
router.post('/', toCheck.toCheck(), InmuebleController.register);
router.put('/:id', toCheck.toCheck(), InmuebleController.update);
router.delete('/:id', InmuebleController.erase);

module.exports = router
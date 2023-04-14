// Importar dependencias
const express = require('express');

// Cargar Router
const router = express.Router();

// Importamos controlador
const InmuebleController = require('../../controllers/inmueble.controller');


// Definir rutas
router.get('/', InmuebleController.all);

module.exports = router
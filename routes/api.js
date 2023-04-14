const express = require('express');
const router = express.Router();

const inmueblesRouter = require('./api/inmueble.route');

router.use('/inmuebles', inmueblesRouter);

module.exports = router;
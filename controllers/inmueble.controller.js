const Inmueble = require('../models/inmueble.model')
const { isValidObjectId } = require('mongoose')

// Obtener todos los registros
// GET /api/inmuebles
const all = async (req, res) => {
	try {
		const inmuebles = await Inmueble.find()
		if (!inmuebles) return res.status(404).json({
			status: "error",
			msg: "No se han encontrado inmuebles"
		})

		return res.status(200).json({
			status: "success",
			msg: "Listado de inmuebles",
			inmuebles
		})
	} catch (error) {
		throw new Error(error)
	}
}

// Obtener un registro por su ID
// GET /api/inmuebles/:id
const one = async (req, res) => {
	const { id } = req.params

	try {
		const inmueble = await Inmueble.findById(isValidObjectId(id) ? id : null)

		if (!inmueble) return res.status(404).json({
			status: "error",
			msg: "No hemos encontrado ningún inmueble con ese ID"
		})

		return res.status(200).json({
			status: "success",
			msg: `Inmueble con el ID: ${id}`,
			inmueble
		})
	} catch (error) {
		throw new Error(error)
	}





	return res.status(200).send({
		status: "success",
		message: "Lista un inmueble"
	});
}

// POST /api/inmuebles
const register = (req, res) => {
	console.log(req.body);
	return res.status(200).send({
		status: "success",
		message: "Registro de un nuevo inmueble"
	});
}

// PUT /api/inmuebles/:id
const update = (req, res) => {
	const { id } = req.params;
	return res.status(200).send({
		status: "success",
		message: `Actualización del inmueblecon ID: ${id}`
	});
}

// DELETE /api/inmuebles/:id
const erase = (req, res) => {
	const { id } = req.params;
	return res.status(200).send({
		status: "success",
		message: `Eliminación del inmueble con ID: ${id}`
	});
}

module.exports = {
	all,
	one,
	register,
	update,
	erase
}
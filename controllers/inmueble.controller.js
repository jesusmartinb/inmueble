const Inmueble = require('../models/inmueble.model')
const { isValidObjectId } = require('mongoose')
const { validationResult } = require('express-validator');
const { pagination } = require('../config/index.config');


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
		res.json({ fatal: error.message });
	}
}


// Obtener todos los registros paginados
// GET /api/inmuebles/list/:page?
const allPaginate = async (req, res) => {

	// opciones de paginación
	const options = pagination

	if (req.params.page) {
		options.page = req.params.page
	}

	try {
		await Inmueble.paginate(
			{},
			options,
			(error, inmuebles) => {
				if (error || !inmuebles) {
					return res.status(404).json({
						status: "error",
						msg: "No se han encontrado inmuebles"
					})
				}
				return res.status(200).json({
					status: "success",
					msg: "Listado de inmuebles",
					inmuebles
				})
			}
		)
	} catch (error) {
		res.json({ fatal: error.message });
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
		res.json({ fatal: error.message });
	}
}


// Crear un nuevo registro
// POST /api/inmuebles
const register = async (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() })
	}

	// Recoger datos de la petición
	let params = req.body

	try {
		// Control de pisos duplicados
		const duplicado = await Inmueble.find({
			$and: [
				{ piso: params.piso },
				{ letra: params.letra.toUpperCase() }
			]
		})

		if (duplicado && duplicado.length >= 1) {
			return res.status(200).json({
				status: "error",
				msg: "El inmueble ya está registrado"
			})
		}

		const creado = await Inmueble.create(req.body)

		if (!creado) return res.status(404).json({
			status: "error",
			msg: "No se ha podido insertar el inmueble"
		})

		return res.status(200).json({
			status: "success",
			msg: "Inmueble registrado en la base de datos",
			creado
		})
	} catch (error) {
		res.json({ fatal: error.message });
	}
}

// Actualiza un registro
// PUT /api/inmuebles/:id
const update = async (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() })
	}

	const { id } = req.params;

	try {
		const inmueble = await Inmueble.findByIdAndUpdate(
			isValidObjectId(id) ? id : null,
			req.body,
			{ new: true }
		);

		if (!inmueble) {
			return res.status(404).json({
				status: "error",
				msg: "El inmueble con ese ID no existe, no se puede actualizar"
			})
		}

		res.status(200).json({
			status: "success",
			msg: `Se ha actualizado correctamente el inmueble con ID: ${id}`,
			inmueble
		})
	} catch (error) {
		res.json({ fatal: error.message });
	}

}

// Borrar un registro
// DELETE /api/inmuebles/:id
const erase = async (req, res) => {
	const { id } = req.params;

	try {
		const inmueble = await Inmueble.findByIdAndDelete(isValidObjectId(id) ? id : null)

		if (!inmueble) {
			return res.status(404).json({
				status: "error",
				msg: 'El inmueble con ese ID no existe, no se puede borrar'
			})
		}

		res.status(200).json({
			status: "success",
			msg: `Ha sido borrado el inmueble con ID: ${id}`
		})
	} catch (error) {
		res.json({ fatal: error.message });
	}

}

module.exports = {
	all,
	allPaginate,
	one,
	register,
	update,
	erase
}
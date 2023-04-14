// Obtener todos los registros
// GET /api/inmuebles
const all = (req, res) => {
	return res.status(200).send({
		status: "success",
		message: "Listado de inmuebles"
	});
}

// GET /api/inmuebles/:id
const one = (req, res) => {
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
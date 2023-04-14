// Obtener todos los registros
// GET /api/inmuebles
const all = (req, res) => {
	return res.status(200).send({
		status: "success",
		message: "Listado de inmuebles"
	});
}

module.exports = {
	all
}
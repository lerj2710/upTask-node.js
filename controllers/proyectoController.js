const Proyectos = require('../models/Proyectos');

const proyectoHome = async (req, res) => {
    const proyectos = await Proyectos.findAll();



	res.render('index', {
		nombrePagina: 'Proyectos',
        proyectos
	});
};
const formularioProyectos = (req, res) => {
	res.render('nuevoProyectos', {
		nombrePagina: 'Nuevo Proyectos'
	});
};
const nuevoProyectos = async (req, res) => {
	const { nombre } = req.body;

	let errores = [];
	if (!nombre) {
		errores.push({ texto: 'Agrega un Nombre al Proyecto' });
	}

	//si  hay errores
	if (errores.length > 0) {
		res.render('nuevoProyectos', {
			nombrePagina: 'Nuevo proyecto',
			errores
		});
	} else {
		//insertar en db
		const proyecto = await Proyectos.create({ nombre });
		res.redirect('/');
	}
};

module.exports = {
	proyectoHome,
	formularioProyectos,
	nuevoProyectos
};

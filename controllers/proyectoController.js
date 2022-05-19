const Proyectos = require('../models/Proyectos');

const proyectoHome = async (req, res) => {
	const proyectos = await Proyectos.findAll();

	res.render('index', {
		nombrePagina: 'Proyectos ' + res.locals.year,
		proyectos
	});
};
const formularioProyectos = async (req, res) => {
	const proyectos = await Proyectos.findAll();

	res.render('nuevoProyectos', {
		nombrePagina: 'Nuevo Proyectos',
		proyectos
	});
};
const nuevoProyectos = async (req, res) => {
	const proyectos = await Proyectos.findAll();

	const { nombre } = req.body;

	let errores = [];
	if (!nombre) {
		errores.push({ texto: 'Agrega un Nombre al Proyecto' });
	}

	//si  hay errores
	if (errores.length > 0) {
		res.render('nuevoProyectos', {
			nombrePagina: 'Nuevo proyecto',
			errores,
			proyectos
		});
	} else {
		//insertar en db
		const proyecto = await Proyectos.create({ nombre });
		res.redirect('/');
	}
};

const proyectoUrl = async (req, res, next) => {
	const proyectos = await Proyectos.findAll();

	const proyecto = await Proyectos.findOne({
		where: {
			url: req.params.url
		}
	});
	
	if (!proyecto) return next();

	//render a la vista
	res.render('tareas', {
		nombrePagina: 'Tareas Del Proyecto',
		proyecto,
		proyectos
	});
};

module.exports = {
	proyectoHome,
	formularioProyectos,
	nuevoProyectos,
	proyectoUrl
};

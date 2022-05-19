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
		await Proyectos.create({ nombre });
		res.redirect('/');
	}
};

const proyectoUrl = async (req, res, next) => {
	const proyectosPromise = Proyectos.findAll();

	const proyectoPromise = Proyectos.findOne({
		where: {
			url: req.params.url
		}
	});
	const [ proyectos, proyecto ] = await Promise.all([ proyectosPromise, proyectoPromise ]);

	if (!proyecto) return next();

	//render a la vista
	res.render('tareas', {
		nombrePagina: 'Tareas Del Proyecto',
		proyecto,
		proyectos
	});
};

const formularioEditar = async (req, res) => {
	const proyectosPromise = Proyectos.findAll();

	const proyectoPromise = Proyectos.findOne({
		where: {
			id: req.params.id
		}
	});
	const [ proyectos, proyecto ] = await Promise.all([ proyectosPromise, proyectoPromise ]);

	//render a la vista
	res.render('nuevoProyectos', {
		nombrePagina: 'Editar Proyecto',
		proyectos,
		proyecto
	});
};
const actualizarProyecto = async (req, res) => {
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
		await Proyectos.update(
			{ nombre: nombre }, 
			{ where: { id: req.params.id } }
		);
		res.redirect('/');
	}
};

module.exports = {
	proyectoHome,
	formularioProyectos,
	nuevoProyectos,
	proyectoUrl,
	formularioEditar,
	actualizarProyecto
};

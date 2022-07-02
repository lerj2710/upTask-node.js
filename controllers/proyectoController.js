const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

const proyectoHome = async (req, res) => {
	// console.log(res.locals.usuario);
	const usuarioId = res.locals.usuario.id;
	const proyectos = await Proyectos.findAll({ where: { usuarioId } });

	res.render('index', {
		nombrePagina: 'Proyectos ' + res.locals.year,
		proyectos
	});
};

const formularioProyectos = async (req, res) => {
	const usuarioId = res.locals.usuario.id;
	const proyectos = await Proyectos.findAll({ where: { usuarioId } });

	res.render('nuevoProyectos', {
		nombrePagina: 'Nuevo Proyectos',
		proyectos
	});
};

const nuevoProyectos = async (req, res) => {
	const usuarioId = res.locals.usuario.id;
	const proyectos = await Proyectos.findAll({ where: { usuarioId } });

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
		//no hay errores
		const usuarioId = res.locals.usuario.id;
		//insertar en db
		await Proyectos.create({ nombre, usuarioId });
		res.redirect('/');
	}
};

const proyectoUrl = async (req, res, next) => {
	const usuarioId = res.locals.usuario.id;
	const proyectosPromise = Proyectos.findAll({ where: { usuarioId } });

	const proyectoPromise = Proyectos.findOne({
		where: {
			url: req.params.url,
			usuarioId
		}
	});
	const [ proyectos, proyecto ] = await Promise.all([ proyectosPromise, proyectoPromise ]);

	//Consultar tareas del proyecto actual
	const tareas = await Tareas.findAll({
		where: {
			proyectoId: proyecto.id
		}
		// include: [ { model: Proyectos } ]
	});

	if (!proyecto) return next();

	//render a la vista
	res.render('tareas', {
		nombrePagina: 'Tareas Del Proyecto',
		proyecto,
		proyectos,
		tareas
	});
};

const formularioEditar = async (req, res) => {
	const usuarioId = res.locals.usuario.id;
	const proyectosPromise = Proyectos.findAll({ where: { usuarioId } });

	const proyectoPromise = Proyectos.findOne({
		where: {
			id: req.params.id,
			usuarioId
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
	const usuarioId = res.locals.usuario.id;
	const proyectos = await Proyectos.findAll({ where: { usuarioId } });

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
		await Proyectos.update({ nombre: nombre }, { where: { id: req.params.id } });
		res.redirect('/');
	}
};

const eliminarProyecto = async (req, res, next) => {
	// req params ó query
	const { urlProyecto } = req.query;

	const resultado = await Proyectos.destroy({ where: { url: urlProyecto } });

	if (!resultado) {
		return next();
	}
	res.status(200).send('proyecto eliminado correctamente');
};

module.exports = {
	proyectoHome,
	formularioProyectos,
	nuevoProyectos,
	proyectoUrl,
	formularioEditar,
	actualizarProyecto,
	eliminarProyecto
};

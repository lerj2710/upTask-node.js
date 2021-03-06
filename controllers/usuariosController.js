const Usuarios = require('../models/Usuarios');
const enviareEmail = require('../handlers/email');
const { usuarioAutenticado } = require('./authController');

const fromCrearCuenta = (req, res) => {
	res.render('crearCuenta', {
		nombrePagina: 'Crear Cuenta Uptask'
	});
};

const fromInciarSesion = (req, res) => {
	const { error } = res.locals.mensajes;
	res.render('iniciarSesion', {
		nombrePagina: 'Iniciar sesión Uptask',
		error
	});
};

const crearCuenta = async (req, res) => {
	// leer el formulario
	const { email, password } = req.body;

	try {
		//crear el usuario
		await Usuarios.create({
			email,
			password
		});

		//crear una URL de confirmar
		const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;

		//crear un objecto de usuario
		const usuario = {
			email
		};

		//enviar email
		await enviareEmail.enviar({
			usuario,
			subject: 'Confirma tu cuenta Uptask',
			confirmarUrl,
			archivo: 'confirmar-cuenta'
		});

		//redidigir al usuario
		req.flash('correcto', 'Enviamos un mensaje a tu correo, confirma tu cuenta');
		res.redirect('/iniciar-sesion');

	} catch (error) {
		req.flash('error', error.errors.map((error) => error.message));
		res.render('crearCuenta', {
			mensajes: req.flash(),
			nombrePagina: 'Crear Cuenta Uptask',
			email,
			password
		});
	}
};

const formRestablecerPassword = (req, res) => {
	res.render('reestablecer', {
		nombrePagina: 'Reestablecer tu Contraseña'
	});
};

//cambia el estado de una cuenta
const confirmarCuenta = async (req, res) => {
	const usuario = await Usuarios.findOne({
		where: {
			email: req.params.correo
		}
	});
	// si no existe el usuario
	if (!usuario) {
		req.flash('error', 'No valido');
		res.redirect('/crear-cuenta');
	}
	usuario.activo = 1;
	 await usuario.save();

	req.flash('correcto', 'cuenta confirmada correctamente');
	res.redirect('/iniciar-sesion');
};
module.exports = {
	fromCrearCuenta,
	crearCuenta,
	fromInciarSesion,
	formRestablecerPassword,
	confirmarCuenta
};

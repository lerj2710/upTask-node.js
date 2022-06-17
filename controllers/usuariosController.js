const Usuarios = require('../models/Usuarios');

const fromCrearCuenta = (req, res) => {
	res.render('crearCuenta', {
		nombrePagina: 'Crear Cuenta Uptask'
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
module.exports = {
	fromCrearCuenta,
	crearCuenta
};

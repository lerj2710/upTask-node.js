const Usuarios = require('../models/Usuarios');

const fromCrearCuenta = (req, res) => {
	res.render('crearCuenta', {
		nombrePagina: 'Crear Cuenta Uptask'
	});
};
const crearCuenta = (req, res) => {
	// leer el formulario
	const { email, password } = req.body;
	//crear el usuario
	Usuarios.create({
		email,
		password
	}).then(() => {
		res.redirect('/iniciar-sesion')
	})
	.catch((err)=>{
		console.log(err);
	})
};
module.exports = {
	fromCrearCuenta,
	crearCuenta
};

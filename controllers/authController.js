const crypto = require('crypto');

const Usuarios = require('../models/Usuarios');
const enviareEmail = require('../handlers/email');

const passport = require('passport');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const Op = Sequelize.Op;

const autenticarUsuario = passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/iniciar-sesion',
	failureFlash: true,
	badRequestMessage: 'Ambos campos son obligatorios'
});

// verificar si el usuario esta logeado o no
const usuarioAutenticado = (req, res, next) => {
	// si esta autenticado adelante
	if (req.isAuthenticated()) {
		return next();
	}
	//si no esta autentica redirigir al formulario
	return res.redirect('/iniciar-sesion');
};

const cerrarSesion = (req, res) => {
	req.session.destroy(() => {
		res.redirect('/iniciar-sesion'); //cerrar la session
	});
};
//generar token valido
const enviarToken = async (req, res) => {
	// verificar si el usuario exite
	const { email } = req.body;
	const usuario = await Usuarios.findOne({ where: { email } });
	//si no exite el usuario
	if (!usuario) {
		req.flash('error', 'No exite el usuario');
		res.render('reestablecer', {
			nombrePagina: 'Reestablecer tu Contraseña',
			mensajes: req.flash()
		});
	}
	//usuario existe
	usuario.token = crypto.randomBytes(20).toString('hex');
	usuario.expiracion = Date.now() + 3600000;
	//guardar en DB
	await usuario.save();
	const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;

	// enviareEmail con el token
	await enviareEmail.enviar({
		usuario,
		subject: 'Password Reset',
		resetUrl,
		archivo: 'reestablecer-password'
	});
};

const validarToken = async (req, res) => {
	const usuario = await Usuarios.findOne({
		where: {
			token: req.params.token
		}
	});

	//si no hay usuario
	if (!usuario) {
		req.flash('error', 'No Valido');
		res.redirect('/reestablecer');
	}
	//formulario para generar el password
	res.render('resetPassword', {
		nombrePagina: 'Reestablecer Contraseña'
	});
	// console.log(usuario);
};
const actualizarPassword = async (req, res) => {
	//verificar token y expiracion
	const usuario = await Usuarios.findOne({
		where: {
			token: req.params.token,
			expiracion: {
				[Op.gte]: Date.now()
			}
		}
	});
	//veririficarmos si el usuario existe
	if (!usuario) {
		req.flash('error', 'No Valido');
		res.redirect('/reestablecer');
	}
	//hashear el passoword nuevo
	usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
	usuario.token = null;
	usuario.expiracion = null;

	//guardar DB
	await usuario.save();

	req.flash('correcto', 'tu contraseña fue modificada correctamente');
	res.redirect('/iniciar-sesion');
};

module.exports = {
	autenticarUsuario,
	usuarioAutenticado,
	cerrarSesion,
	enviarToken,
	validarToken,
	actualizarPassword
};

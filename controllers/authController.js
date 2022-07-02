const passport = require('passport');

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
		res.redirect('/iniciar-sesion');//cerrar la session 
	});
};
module.exports = {
	autenticarUsuario,
	usuarioAutenticado,
	cerrarSesion
};

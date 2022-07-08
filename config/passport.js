const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//referencia al model que hay que autenticar
const Usuarios = require('../models/Usuarios');

// local strategy-- login con credenciales propios (usuario y password)
passport.use(
	new LocalStrategy(
		//por default passport eséra un usuario y password
		{
			usernameField: 'email',
			passwordField: 'password'
		},
		async (email, password, done) => {
			try {
				const usuario = await Usuarios.findOne({
					where: {
						email,
						activo: 1
					}
				});
				//el usuario existe pero password incorrecto
				if (!usuario.verificarPassword(password)) {
					return done(null, false, {
						message: 'Password Incorrecto'
					});
				}
				// email existe y password correcto
				return done(null, usuario);
			} catch (error) {
				return done(null, false, {
					message: 'El usuario no existe'
				});
			}
		}
	)
);

// serealizar el usuario
passport.serializeUser((usuario, callback) => {
	callback(null, usuario);
});

// deserealizar el usuario
passport.deserializeUser((usuario, callback) => {
	callback(null, usuario);
});

module.exports = passport;

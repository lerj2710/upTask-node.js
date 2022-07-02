const { Router } = require('express');
const { body } = require('express-validator');
const { autenticarUsuario, usuarioAutenticado, cerrarSesion } = require('../controllers/authController');
const router = Router();

// controladores
const {
	proyectoHome,
	nuevoProyectos,
	formularioProyectos,
	proyectoUrl,
	formularioEditar,
	actualizarProyecto,
	eliminarProyecto
} = require('../controllers/proyectoController');
const { agregartarea, cambiarEstadoTarea, eliminarTarea } = require('../controllers/tareasController');
const { fromCrearCuenta, crearCuenta, fromInciarSesion } = require('../controllers/usuariosController');

// METODO GET - PROYECTO

router.get('/', usuarioAutenticado, proyectoHome);
router.get('/nuevo-proyecto', usuarioAutenticado, formularioProyectos);
router.get('/proyectos/:url', usuarioAutenticado, proyectoUrl);
router.get('/proyecto/editar/:id', usuarioAutenticado, formularioEditar);
router.get('/crear-cuenta', fromCrearCuenta);
//iniciar session
router.get('/iniciar-sesion', fromInciarSesion);
// cerrar sesion
router.get('/cerrar-sesion', cerrarSesion);

// METODO POST - PROYECTO && tarea

router.post('/nuevo-proyecto', usuarioAutenticado, body('nombre').not().isEmpty().trim().escape(), nuevoProyectos);
router.post(
	'/nuevo-proyecto/:id',
	usuarioAutenticado,
	body('nombre').not().isEmpty().trim().escape(),
	actualizarProyecto
);
router.post('/proyectos/:url', usuarioAutenticado, agregartarea);
router.post('/crear-cuenta', crearCuenta);
router.post('/iniciar-sesion', autenticarUsuario);

// METODO DELETE - PROYECTO && tarea

router.delete('/proyectos/:url', usuarioAutenticado, eliminarProyecto);
router.delete('/tareas/:id', usuarioAutenticado, eliminarTarea);

// METODO PATCH - tarea

router.patch('/tareas/:id', usuarioAutenticado, cambiarEstadoTarea);
module.exports = router;

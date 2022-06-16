const { Router } = require('express');
const { body } = require('express-validator');
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
const { fromCrearCuenta } = require('../controllers/usuarosController');

// METODO GET - PROYECTO

router.get('/', proyectoHome);
router.get('/nuevo-proyecto', formularioProyectos);
router.get('/proyectos/:url', proyectoUrl);
router.get('/proyecto/editar/:id', formularioEditar);
router.get('/crear-cuenta', fromCrearCuenta);

// METODO POST - PROYECTO && tarea

router.post('/nuevo-proyecto', body('nombre').not().isEmpty().trim().escape(), nuevoProyectos);
router.post('/nuevo-proyecto/:id', body('nombre').not().isEmpty().trim().escape(), actualizarProyecto);
router.post('/proyectos/:url', agregartarea);

// METODO DELETE - PROYECTO && tarea

router.delete('/proyectos/:url', eliminarProyecto);
router.delete('/tareas/:id', eliminarTarea);

// METODO PATCH - tarea

router.patch('/tareas/:id', cambiarEstadoTarea);

module.exports = router;

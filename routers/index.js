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

router.get('/', proyectoHome);
router.get('/nuevo-proyecto', formularioProyectos);
router.post('/nuevo-proyecto', body('nombre').not().isEmpty().trim().escape(), nuevoProyectos);

//listar proyectos
router.get('/proyectos/:url', proyectoUrl);

// Actulizar proyecto
router.get('/proyecto/editar/:id', formularioEditar);
router.post('/nuevo-proyecto/:id', body('nombre').not().isEmpty().trim().escape(), actualizarProyecto);

//Eliminar Proyecto
router.delete('//rpyectos/:url', eliminarProyecto);

module.exports = router;

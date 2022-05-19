const { Router } = require('express');
const { body } = require('express-validator');
const router = Router();

// llamr controlador
const { proyectoHome, nuevoProyectos, formularioProyectos, proyectoUrl } = require('../controllers/proyectoController');

router.get('/', proyectoHome);
router.get('/nuevo-proyecto', formularioProyectos);
router.post('/nuevo-proyecto', body('nombre').not().isEmpty().trim().escape(), nuevoProyectos);

//listar proyectos
router.get('/proyectos/:url', proyectoUrl);
module.exports = router;

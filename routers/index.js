const { Router } = require('express');
const router = Router();

// llamr controlador
const  { proyectoHome, nuevoProyectos, formularioProyectos } = require('../controllers/proyectoController');

router.get('/', proyectoHome );
router.get('/nuevo-proyecto', formularioProyectos );
router.post('/nuevo-proyecto', nuevoProyectos );


module.exports = router 
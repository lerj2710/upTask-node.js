const { Router } = require('express');
const router = Router();

// llamr controlador
const  { proyectoHome, proyectoHome2 } = require('../controllers/proyectoController');

router.get('/', proyectoHome );
router.get('/nosotros', (req, res)=>{
    res.render('nosotros')
})


module.exports = router 
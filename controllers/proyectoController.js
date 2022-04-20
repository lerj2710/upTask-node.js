const Proyectos = require('../models/Proyectos')
const proyectoHome = (req, res) => {
    res.render('index', {
        nombrePagina: 'Proyectos'
    })
}
const formularioProyectos = (req, res) => {
    res.render('nuevoProyectos', {
        nombrePagina: 'Nuevo Proyectos'
    })
}
const nuevoProyectos = async (req, res) => {
    //mirar desde la consola
    //console.log(req.body);
    const { nombre } = req.body

    //hacer un error a pie
    let errores = [];
    if (!nombre) {
        errores.push({ 'texto': 'Agrega un Nombre al Proyecto' })
    }

    //si  hay errores
    if (errores.length > 0) {
        res.render('nuevoProyectos', {
            nombrePagina: 'Nuevo proyecto',
            errores
        })
    }else {
        //insertar en db
        const proyecto = await Proyectos.create({ nombre });
        res.redirect('/');
          
    }

}

module.exports = {
    proyectoHome,
    formularioProyectos,
    nuevoProyectos,

}
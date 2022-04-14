
const proyectoHome = (req, res) =>{
    res.render('index', {
        nombrePagina: 'Proyectos'
    })
}
const formularioProyectos =  (req, res)=>{
    res.render('nuevoProyectos', {
        nombrePagina: 'Nuevo Proyectos'
    })
}
const nuevoProyectos =  (req, res)=>{
    //mirar desde la consola
    console.log(req.body);
}

module.exports ={
    proyectoHome,
    formularioProyectos,
    nuevoProyectos,

}
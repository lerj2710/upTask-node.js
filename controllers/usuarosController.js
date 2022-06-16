const fromCrearCuenta = (req, res) => {
	res.render('crearCuenta',{
        nombrePagina: 'Crear Cuenta Uptask'
    })
};

module.exports = {
	fromCrearCuenta
};

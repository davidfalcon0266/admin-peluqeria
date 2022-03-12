const { response } = require("express");
// Obtenemos los resultados de las validaciones que se hacen en la ruta antes de entrar aqui
const { validationResult } = require('express-validator');

const validarCampos = (req, res=response, next) => {
    // Obtiene todos los errores de las validaciones que pueden venir 
    const errores = validationResult(req);
        if(!errores.isEmpty()) {
           return res.status(400).json({
               ok: false,
               errores: errores.mapped()
           })
        }
    // Siempre se debe llamar esta funcion para que pueda continuar
    next();

}

module.exports = {
    validarCampos
}
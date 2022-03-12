const bcrypt = require('bcryptjs/dist/bcrypt');
const { response } = require('express');

const { generarJWT } = require('../helpers/jwt');

const Usuario = require('../models/usuario');

const login = async(req, res = response) => {

    const { email, password } = req.body;
   
    try {

        // Verificamos si existe un usuario con el email
        const usuarioDb = await Usuario.findOne({email});
        if(!usuarioDb) {
           return res.status(404).json({
               ok: false,
               msj: 'No existe usuario con ese correo'
           })
        }

        // Verificar la contraseña
        const validaPassword = bcrypt.compareSync(password, usuarioDb.password);
        if(!validaPassword) {
           return res.status(400).json({
               ok: false,
               msj: 'Contraseña no valida'
           })
        }

        // Generar el token
        const token = await generarJWT(usuarioDb.id);
        res.status(200).json({
            ok: true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: 'Error inesperado revisar log'
        })
    }
}

module.exports = {
    login
}
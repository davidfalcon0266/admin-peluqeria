
const { response } = require('express');
// Definimos nuestro modelo de usuario para poder trabajar con la bd
const Usuario = require('../models/usuario');

// Para encryptar contraseñas
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');
// Obtiene todod los usuarios
const getUsuarios = async(req, res) => {

    // Obtenemos todos los usuarios
    // Filtramos solo lo que queremos enviar
    const usuarios = await Usuario.find({}, 'nombre email rol google');

    res.status(200).json({
        ok: true,
        usuarios,
        uid: req.uid
    })
}

// Crea un usuario
const crearUsuario =  async(req, res = response) => {
    const { email, password, nombre } = req.body;
    
    try {

        // Validamos que no exista ya ese correo en la bd
        const existEmail = await Usuario.findOne({email});
        if(existEmail) {
          return res.status(400).json({
              ok: false,
              msj: 'Existe en usuario con ese correo'
          })
        }
    
        // Creamos una nva instancia del usuario
        const usuario = new Usuario(req.body);

        // Encriptamos la contraseña antes de guardar en la bd
        // Gneramos data aleatoria
        const passAleatorio = bcrypt.genSaltSync(); 
        usuario.password = bcrypt.hashSync(password, passAleatorio);

        // Guardamos en la bd
        await usuario.save();
        // Generar el token
        const token = await generarJWT(usuario.id);
        res.status(200).json({
            ok: true,
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: 'Error inesperado'
        })
    }
}

// Actualiza usuario
const actualizarUsuario = async (req, res=response) => {
    // Obtenemos el id que viene en la url
    const id = req.params.id;
    try {

        const usuarioBd = await Usuario.findById(id);

        if(!usuarioBd) {
        return res.status(404).json({
            ok: false,
            msj: 'El usuario no existe'
        })
        }

        const {password, google, email, ...campos} = req.body;

        /* Si el correo es diferente quiere decir que lo quiere 
        actualizar pero debemos verificar que no exista uno igual ya registrado */
        if(usuarioBd.email  != email) {
            // Validamos que no exista ya ese correo en la bd
            const existEmail = await Usuario.findOne({email});
            if(existEmail) {
            return res.status(400).json({
                ok: false,
                msj: 'Existe en usuario con ese correo'
            })
            }
        }   

        campos.email = email;
        
        // {new: true} es para que nos devuelva el nuevo usuario que se acaba de actualizar
        const usuarioActualizado = await Usuario.findByIdAndUpdate(id, campos, {new: true});

        res.status(200).json({
            ok: true,
            usuarioActualizado
        });
        
    } catch (error) {
        res.status(500).json({
            ok: true,
            msj: 'Error inesperado por favor ver log'
        })
    }
}

// Borrar usuario
const borrarUsuario = async(req, res) => {
     const id = req.params.id
    try {

        
        const usuarioBd = await Usuario.findById(id);

        if(!usuarioBd) {
            return res.status(404).json({
                ok: false,
                msj: 'El usuario no existe'
            })
        }

        await Usuario.findByIdAndDelete(id);
       
        res.status(200).json({
            ok: true,
            msj: 'Usuario eliminado'
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msj: 'Error inesperado revisar log'
        })
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}
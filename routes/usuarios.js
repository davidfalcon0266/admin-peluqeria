/* Ruta: /api/usuarios */

const { Router } = require('express');
// Validaciones de los campos obligatorios
const { check } = require('express-validator');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');

const router = Router();

// Obtiene todos los usuarios
router.get('/', validarJWT, getUsuarios);
// Crea un usuario
router.post('/',
        [
          check('nombre', 'El nombre es obligatorio').not().isEmpty(),
          check('email', 'El correo es obligatorio').isEmail(),
          check('password', 'El password es obligatorio').not().isEmpty(),
          validarCampos
        ],
         crearUsuario);

// Actualiza usuario
router.put('/:id', 
      [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
        check('rol', 'El rol es obligatorio').not().isEmpty(),
        validarCampos
      ],
       actualizarUsuario);

// Borrar usuario
router.delete('/:id', validarJWT, borrarUsuario);

module.exports = router;
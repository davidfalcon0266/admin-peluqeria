
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { crearCliente, getClientes } = require('../controllers/clientes');
const routes = Router();

routes.post('/', 
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('rut', 'El rut es obligatorio').not().isEmpty(),
    check('telefono', 'El telefono es obligatorio').not().isEmpty(),
    check('nombre_mascota', 'El nombre de la mascota es obligatorio').not().isEmpty(),
    check('raza', 'La raza es obligatorio').not().isEmpty(),
    validarCampos
  ],
   crearCliente);
routes.get('/', getClientes);


module.exports = routes;
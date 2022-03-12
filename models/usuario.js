const {Schema, model} = require('mongoose');

// Definimos el modelo que va a tener el user
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        default: "user_rol"
    },
    google: {
        type: Boolean,
        default: false
    }
});

// Modificamos la respuesta para solo mostrar loos datos sin la version
UsuarioSchema.method('toJSON', function() {
  const {__v, _id, password, ...object } = this.toObject();  
  // Cambiamos el _id por uid
  object.uid = _id;
  return object;
})

// Nombre que se le va a asignar en la bd
module.exports = model( 'Usuario', UsuarioSchema );


const {Schema, model} = require('mongoose');

// Definimos el modelo que va a tener el cliente
const ClienteSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    rut: {
        type: String,
        required: true,
        unique: true
    },
    telefono: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    nombre_mascota: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    raza: {
        type: String,
        required: true
    },
    edad: {
        type: String
    },
    tamano: {
        type: String
    },
    enfermedad: {
        type: String
    },
    agresividad: {
        type: String
    },
    ultima_peluqueria: {
        type: String
    },
});

// Modificamos la respuesta para solo mostrar loos datos sin la version
ClienteSchema.method('toJSON', function() {
  const {__v, _id, ...object } = this.toObject();  
  // Cambiamos el _id por uid
  object.uid = _id;
  return object;
})

// Nombre que se le va a asignar en la bd
module.exports = model( 'Cliente', ClienteSchema );


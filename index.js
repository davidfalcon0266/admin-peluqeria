// Para leer las variables de entorno
require('dotenv').config();

const express = require('express');
const cors = require('cors');


const { dbConnection } = require('./database/config');

// Inicializa el server
const app = express();

// Conf cors
app.use(cors());

// Base de dato
dbConnection();


// Rutas
app.get('/', (req, res) => {
   res.status(200).json({
       ok: true,
       msj: 'hola mundo'
   })
})




app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en: ' + process.env.PORT);
});
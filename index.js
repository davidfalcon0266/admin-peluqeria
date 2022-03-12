// Para leer las variables de entorno
require('dotenv').config();

const express = require('express');
const cors = require('cors');


const { dbConnection } = require('./database/config');

// Inicializa el server
const app = express();

// Conf cors
app.use(cors());

// Lestura y parseo del body
app.use( express.json() );

// Base de dato
dbConnection();


// Rutas
// Ruta principal de los usuarios/ Siempre van a routes/usuarios
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

// Clientes
app.use('/api/cliente', require('./routes/clientes'));




app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en: ' + process.env.PORT);
});
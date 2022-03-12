
// Para conectarnos a la bd
const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('Db online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectarse');
    }

}


module.exports = {
    dbConnection
}
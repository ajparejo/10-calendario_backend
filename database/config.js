const mongoose = require('mongoose');

const dbConnection = async() => {
    
    try {
        await mongoose.connect(process.env.DB_CON || '');
        console.log('Conectado a la base de datos');
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar base de datos');
    }

}

module.exports = {
    dbConnection
}
const mysql = require ('mysql');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambia esto si usas un usuario diferente
    password: '', // Cambia esto por la contraseña de tu base de datos
    database: 'uriarte'
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL.');
});

module.exports = db; //exporto "db"
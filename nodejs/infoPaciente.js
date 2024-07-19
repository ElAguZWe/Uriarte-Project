const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 80;

// Configurar body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'uriarte'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Conexión fallida: ' + err.stack);
        return;
    }
    console.log('Conectado a la base de datos.');
});

// Manejar la solicitud POST para insertar datos en la tabla 'paciente'
app.post('/add-patient', (req, res) => {
    const { nombre, apellido, dni, telefono, fechaNacimiento, genero } = req.body;

    // Preparar y ejecutar la consulta de inserción
    const sql = 'INSERT INTO paciente (nombre, apellido, DNI, telefono, fechaNacimiento, genero) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [nombre, apellido, dni, telefono, fechaNacimiento, genero], (err, result) => {
        if (err) {
            return res.send('Error: ' + err.message);
        }
        res.send('Nuevo registro creado exitosamente');
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});

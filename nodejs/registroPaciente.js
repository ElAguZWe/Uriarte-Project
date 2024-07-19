const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();
const port = 80;

// Middleware para parsear application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos desde el directorio /html
app.use(express.static(path.join(__dirname, '../html')));

// Configuración de la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambia esto si usas un usuario diferente
    password: '', // Cambia esto por la contraseña de tu base de datos
    database: 'uriarte'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL.');
});

// Ruta para manejar la solicitud POST desde el formulario
app.post('/guardarPaciente', (req, res) => {
    const { nombre, apellido, DNI, genero, obraSocial, telefono, correo, fechaNacimiento, direccion } = req.body;

    // Encriptar la contraseña (si es necesario)
    // const hashedPassword = bcrypt.hashSync(password, 10);

    // Insertar los datos en la base de datos
    const sql = 'INSERT INTO pacientes (nombre, apellido, dni, genero, obra_social, telefono, correo, fecha_nacimiento, direccion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [nombre, apellido, DNI, genero, obraSocial, telefono, correo, fechaNacimiento, direccion], (err, result) => {
        if (err) {
            console.error('Error al guardar el paciente: ' + err.message);
            return res.redirect('/html/error.html'); // Redirige a una página de error en caso de fallo
        }
        console.log('Paciente registrado correctamente en la base de datos.');
        res.redirect('/html/exito.html'); // Redirige a una página de éxito después de guardar
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});

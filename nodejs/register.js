// Importar los módulos necesarios
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const mysql = require ('mysql');



//Conexión base
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



// Configurar Express
const app = express();
const port = 80; // Puerto donde se ejecutará el servidor


// Configurar bodyParser para parsear application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para servir archivos estáticos como register.html, imágenes, CSS, etc.
app.use(express.static(path.join(__dirname, '../html')));

// Ruta para manejar la solicitud POST desde register.html
app.post('/register', (req, res) => {
    console.log("HASTA ACA LLEGO");
    const { usuario, email, password, cpassword } = req.body;

    // Verificar si las contraseñas coinciden
    if (password !== cpassword) {
        res.send('Las contraseñas no coinciden.');
        return;
    }

    // Generar hash de la contraseña
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.send('Error al encriptar la contraseña.');
        }

        const sql = 'INSERT INTO registro (nombreUsuario, contrasenia, correo) VALUES (?, ?, ?)';
        db.query(sql, [usuario, hashedPassword ,email], (err, result) => {
            if (err) {
                console.error('Error al guardar el usuario: ' + err.message);
            }
            else{
                console.log("Guardado el usuario pvto.");
            }
        });

        // Aquí puedes implementar la lógica para guardar los datos en la base de datos, por ejemplo MySQL - NOTA DE UN BONAERENSE NO TA´ UnU
        
        // Simulación de inserción en una base de datos
        console.log(`Usuario: ${usuario}, Email: ${email}, Contraseña Hashed: ${hashedPassword}`);

        // Redirigir a una página de éxito o a cualquier otra página deseada
        res.redirect('/index.html');
    });
}); 

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});

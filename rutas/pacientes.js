const path = require('path');
const db = require('../configuraciones/DB.js');
const passport = require('../configuraciones/passport.js');

const rcPacientes = {};

rcPacientes.GETregitrar = (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'registroNuevPacient.html'))};

rcPacientes.POSTcargar = (res, req) => {
    console.log(req.body);
    const { Nombre, apellido, DNI, genero, obraSocial, telefono, correo, fechaNacimiento, direccion } = req.body;

    // Insertar los datos en la base de datos
    const sql = 'INSERT INTO pacientes (nombre, apellido, DNI, genero, obraSocial, telefono, correo, fecha_nacimiento, direccion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [Nombre, apellido, DNI, genero, obraSocial, telefono, correo, fechaNacimiento, direccion], (err, result) => {
        if (err) {
            console.error('Error al guardar el paciente: ' + err.message);
            res.sed('Error al guardar paciente.');
            return res.redirect('/registrarpaciente'); // Redirige a una página de error en caso de fallo
        }
        console.log('Paciente registrado correctamente en la base de datos.');
        res.redirect('/Inicio'); // Redirige a una página de éxito después de guardar
    });

};

module.exports = rcPacientes;
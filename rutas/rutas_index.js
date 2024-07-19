const express = require("express")
const enrrutador = express.Router();

const bcrypt = require('bcrypt');
const path = require('path');

const db = require('../configuraciones/DB.js');
const { request } = require("http");

//IMPORTO CONTROLADORES DE RUTAS
const c1Usuario = require ('./usuarioregistro.js');
const c2Paciente = require('./pacientes.js');


//DEFINO RUTAS
enrrutador.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'index.html'));
});

enrrutador.post('/', c1Usuario.POSTlogin);

enrrutador.get('/Inicio', (req, res) => {
    const reqContendio = {usuario, password} = req.body;
    console.log(reqContendio);
    res.sendFile(path.join(__dirname, '../public', 'html', 'proyecGeneral.html'));
});


enrrutador.get('/registrarpaciente', c2Paciente.GETregitrar);

enrrutador.post('/registrarpaciente', c2Paciente.POSTcargar);

enrrutador.get('/registro', c1Usuario.GETregistro);

enrrutador.post('/registro', c1Usuario.POSTregistro);

enrrutador.get('/ListaPacientes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'busquedaPaciente.html'));
});



enrrutador.get('/paciente/consulta', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'tablaConsulta.html'));
});

enrrutador.get('/paciente/historico', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'historial.html'));
});

module.exports = enrrutador;//Eexporto el enrutador para que lo maneje el servidor
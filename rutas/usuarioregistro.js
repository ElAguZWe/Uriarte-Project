const path = require('path');
const bcrypt = require('bcrypt');
const db = require('../configuraciones/DB.js');
const { object } = require('webidl-conversions');
const passport = require('../configuraciones/passport.js');

const rcUsuario = {};

//Obtener formulario para registrar un usuario
rcUsuario.GETregistro = (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'register.html'));
};



//Procesar y gardar datos para un nuevo registro de usuario
rcUsuario.POSTregistro = async (req, res) => {
    console.log("HASTA ACA LLEGO", req.body);
    const { usuario, email, password, cpassword } = req.body;

    // Verificar si las contraseñas coinciden
    if (password !== cpassword) {
        res.send('Las contraseñas no coinciden.');
        return;
    }


    // Verificación de usuario único (Nombre de usuario + Email)

    
    try {

        const b1 = 'SELECT EXISTS(SELECT nombreUsuario FROM registro WHERE nombreUsuario = ?)';
        const b2 = 'SELECT EXISTS(SELECT correo FROM registro WHERE correo = ?)';
        const dbRespuesta1 = await db.query(b1, [usuario]);
        const dbRespuesta2 = await db.query(b2, [email]);

        console.log(dbRespuesta1[0][b1]); // Acceder directamente a la propiedad 'usuario'
        console.log(dbRespuesta2[0][b1]);    // Acceder directamente a la propiedad 'mail'

        if (dbRespuesta1[0] === 1 || dbRespuesta2[0] === 1) {
            console.log("El usuario o el mail ya existe.");
            return res.send("El nombre de usuario o el mail ya existe.");
        } else {
            console.log("El usuario NO existe.");
        }

    } catch (error) {
        console.log(error);
    }

    /*

    
    
        //Verificacion de usuario unico (Nombre de usuario + Email)
        const dbRespuesta1 = await db.query('SELECT EXISTS(SELECT nombreUsuario FROM registro WHERE nombreUsuario = ?)', [usuario]);
        const dbRespuesta2 = await db.query('SELECT EXISTS(SELECT correo FROM registro WHERE correo = ?)', [email]);
        console.log(dbRespuesta1[0][object.keys(dbRespuesta1[0])[0]]);
        console.log(dbRespuesta2[0][object.keys(dbRespuesta2[0])[0]]);
        if (dbRespuesta1[0][object.keys(dbRespuesta1[0])[0]] == 1 || dbRespuesta2[0][object.keys(dbRespuesta2[0])[0]] == 1) {
            console.log("El usuario o el mail ya existe.", error);
            return res.send("El nombre de usuaio o el mail ya existe");
        }
        else {
            console.log("El usuario NO existe.");
        }
    */

    // Generar hash de la contraseña
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.send('Error al encriptar la contraseña.');
        }

        const sql = 'INSERT INTO registro (nombreUsuario, contrasenia, correo) VALUES (?, ?, ?)';
        db.query(sql, [usuario, hashedPassword, email], (err, result) => {
            if (err) {
                console.error('Error al guardar el usuario: ' + err.message);
            }
            else {
                console.log("Guardado el usuario.");
            }
        });

        // Aquí puedes implementar la lógica para guardar los datos en la base de datos, por ejemplo MySQL - NOTA DE UN BONAERENSE NO TA´ UnU

        // Simulación de inserción en una base de datos
        console.log(`Usuario: ${usuario}, Email: ${email}, Contraseña Hashed: ${hashedPassword}`);

        // Redirigir a una página de éxito o a cualquier otra página deseada
        //res.redirect('/');
    });

};

//Procesar y serializar usuario (login)
rcUsuario.POSTlogin = passport.authenticate('local', {
    successRedirect: '/Inicio',
    failureRedirect: '/',
    failureFlash: true
});

module.exports = rcUsuario;
var conexion = require('../config/conexion')
var usuario = require('../model/login')
var libros = require('../model/libros')

var log = require('../model/log')
let alert = require('../node_modules/alert');

module.exports = {
    index: function (req, res) {
        res.render('index', { title: 'Final' });
    },
    validar: function (req, res) {
        //Hacer la validacion
        usuario.login(conexion, req.body, function (err, datos) {
            if (datos[0] == null) {
                console.log("Error de acceso")
                alert('Error de acceso')

                //alertify.alert('Ready!');
                res.redirect('/');
            }
            else {
                console.log("Acceso Correcto")
                console.log(datos[0].id)
                log.logingreso(conexion, datos[0].id, function (err, datos) {
                    console.log("Log Ingreso generado")
                })
                req.session.usuario = datos[0].id
                req.session.visitas = req.session.visitas ? ++req.session.visitas : 1;
                var dataSession = `Has visitado esta página ${req.session.visitas} veces`
                libros.obtener(conexion, function (err, datos) {
                    res.render('libros/index', { title: 'Tarea 4', libros: datos, fecha: 'CookiesFecha' });
                })
            }
        })
    },
    salir: function (req, res) {
        console.log('Destruyendo session')
        delete req.session.user
        res.redirect('/');
    }
}
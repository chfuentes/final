var conexion = require('../config/conexion')
var libros = require('../model/libros')
var borrar = require("fs")
var log = require('../model/log')

module.exports = {
    index: function (req, res) {
        //console.log(req.cookies);
        let CookiesId = JSON.stringify(req.cookies.id)
        let CookiesFecha = JSON.stringify(req.cookies.ultimoacceso).replace(/['"]+/g, '')
        //console.log(CookiesId)
        //console.log(CookiesFecha)
        libros.obtener(conexion, function (err, datos) {
            //console.log(datos[0].autor);
            res.render('libros/index', { title: 'Tarea 4', libros: datos, fecha: CookiesFecha });
        })
    },
    crear: function (req, res) {
        res.render('libros/crear')

    },
    guardar: function (req, res) {
        var idUsuario = req.session.usuario
        var tituloform = req.body.titulo;
        var autorform = req.body.autor;
        var descripcionform = req.body.descripcion;
        //console.log(req.file.filename)
        if (tituloform.length < 50 && autorform.length < 50 && descripcionform.length < 50) { //Si esta ok continuar
            //console.log('OK')
            log.logaccion(conexion, idUsuario, 'Creacion de nuevo libro ' + tituloform, function (err, datos) {
                console.log(err)
            })
            libros.insertar(conexion, req.body, req.file, function (err, datos) {
                res.redirect('/libros');
            })
        }
        else {
            res.writeHead(400, { 'content-type': 'text/plain' });
            res.write('Error 400: Uso de caracteres no validos');
            res.end();
        }//ERROR
    },
    eliminar: function (req, res) {
        console.log("Recepcion de datos")
        var idUsuario = req.session.usuario
        var idLibro = req.params.id
        console.log(req.params.id)
        libros.retornarDatosID(conexion, req.params.id, function (err, registros) {
            var nombreImagen = "public/images/" + (registros[0].imagen)

            if (borrar.existsSync(nombreImagen)) {
                borrar.unlinkSync(nombreImagen)
            }

            log.logaccion(conexion, idUsuario, 'Eliminacion de libro id ' + idLibro, function (err, datos) {
                console.log(err)
            })

            libros.borrar(conexion, req.params.id, function (err) {
                res.redirect('/libros')
            })
        });
    },
    editar: function (req, res) {
        console.log("Editando datos")
        libros.retornarDatosID(conexion, req.params.id, function (err, registros) {
            //console.log(registros[0])
            res.render('libros/editar', { libros: registros[0] })
        })
    },
    actualizar: function (req, res) {
        console.log("Actualizando datos")
        console.log(req.session.usuario)
        var tituloform = req.body.titulo;
        var idUsuario = req.session.usuario
        if (req.file) {
            if (req.file.filename) {
                libros.retornarDatosID(conexion, req.body.id, function (err, registros) {
                    var nombreImagen = "public/images/" + (registros[0].imagen)
                    if (borrar.existsSync(nombreImagen)) {
                        borrar.unlinkSync(nombreImagen)
                    }
                })
                libros.actualizarArchivo(conexion, req.body, req.file, function (err, datos) {
                })
            }
        }
        log.logaccion(conexion, idUsuario, 'Actualizacion Registro ' + tituloform, function (err, datos) {
            //console.log(err)
        })
        libros.actualizar(conexion, req.body, function (err, datos) {
            res.redirect('/libros');
        })
    },
    salir: function (req, res) {
        console.log("Salir")
        res.redirect('/');
    }



}
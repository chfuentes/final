module.exports={
    login:function(conexion,datos, funcion) {
        conexion.query("SELECT * FROM `usuarios` where nombre=? and password=?",[datos.nombre, datos.password],funcion);
    },
    getall:function(conexion, funcion) {
        conexion.query("SELECT * FROM `usuarios` ",funcion);
    },
    logingreso:function (conexion,datos,funcion) {
        conexion.query("insert into `logs` (`usuario`, `descripción`) values(?,'Usuario autenticado')",datos,funcion);
    },
    logcreacion:function (conexion,datos,funcion) {
        conexion.query("insert into `logs` (`usuario`, `descripción`) values(?,'Usuario Crea Libro')",datos,funcion);
    },
    logborrado:function (conexion,datos,funcion) {
        conexion.query("insert into `logs` (`usuario`, `descripción`) values(?,'Usuario Borra Libro')",datos,funcion);
    },
    logaccion:function (conexion,usuario, dato,funcion) {
        conexion.query("insert into `logs` (`usuario`, `descripción`) values(?,?)",[usuario, dato],funcion);
    },
    
}
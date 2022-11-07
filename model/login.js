module.exports={
    login:function(conexion,datos, funcion) {
        conexion.query("SELECT * FROM `usuarios` where nombre=? and password=?",[datos.nombre, datos.password],funcion);
    },
    getall:function(conexion, funcion) {
        conexion.query("SELECT * FROM `usuarios` ",funcion);
    }
}
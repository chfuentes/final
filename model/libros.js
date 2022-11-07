module.exports={
    obtener:function (conexion,funcion) {
        conexion.query("SELECT * FROM `libros`",funcion);
    },
    insertar:function (conexion,datos,archivos, funcion) {
        conexion.query("INSERT INTO `libros` (`titulo`, `autor`, `descripcion`, `imagen`) VALUES (?,?,?,?)",[datos.titulo, datos.autor, datos.descripcion ,archivos.filename],funcion);
    },
    retornarDatosID:function(conexion,id, funcion) {
        conexion.query("SELECT * FROM `libros` where id=?",[id],funcion);
    },
    borrar:function(conexion,id, funcion) {
        conexion.query("DELETE FROM `libros` where id=?",[id],funcion);
    },
    actualizar:function (conexion,datos, funcion) {
        conexion.query("UPDATE `libros` set `titulo`=?, `autor`= ?, `descripcion`= ? where id=?",[datos.titulo, datos.autor, datos.descripcion ,datos.id],funcion);
    },
    actualizarArchivo:function (conexion,datos,archivos, funcion) {
        conexion.query("UPDATE `libros` set `imagen`= ? where id=?",[archivos.filename, datos.id],funcion);
    },
}
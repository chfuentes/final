var mysql = require("mysql")

var con = mysql.createPool({
    host: "remotemysql.com",
    user: "JXQnLJ7zfo",
    password: "dErOdNKblD",
    database: "JXQnLJ7zfo"
});

con.getConnection(function (err, conn) {
    if (err) {
        console.log("Error de conexion")
    }
    if (conn) {
        console.log("Conexion establecida")
        //conn.release();
    }
});

module.exports=con;
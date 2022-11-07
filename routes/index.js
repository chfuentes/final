var express = require('express');
var router = express.Router();
const librosController = require("../controllers/librosController");
const loginController = require('../controllers/loginController');

var multer = require('multer')
var fecha = Date.now();

var rutaAlmacen = multer.diskStorage(
    {
        destination: function (request, file, callback) {
            callback(null, './public/images/');
        },
        filename: function (request, file, callback) {
            console.log(file);
            callback(null, fecha + "-" + file.originalname);
        }
    }
);

/* GET home page. */
router.get('/',loginController.index);

router.post('/ingresar',loginController.validar)
router.get('/salir',loginController.salir)
module.exports = router;

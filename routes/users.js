var express = require('express');
var router = express.Router();

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

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/salir',loginController.salir)

module.exports = router;

const express = require("express");
const router = express.Router();
const noticia = require('../controllers/News');
const registro = require("../controllers/Registro")
var regt
var clasen;

/* GET home page. */
router.get('/registro', function(req, res) {
    res.render('registro');
});
router.post('/registro', function(req, res) {
    regt = new registro(req, res)

    regt.crear_usuario(req, res)
});

router.get('/:user/:password/upload', function(req, res) {
    res.render('upload');
});

router.post('/:user/:password/upload', function(req, res, next) {
    clasen = new noticia(req, res)
    clasen.crear(req, res)
        //}

});


router.get('/:user/:password/edit/:id', function(req, res) {
    clasen = new noticia(req, res)
    clasen.edit(req, res)
});

router.post('/:user/:password/edit/:id', function(req, res) {
    clasen = new noticia(req, res)
    clasen.editar(req, res)
});

router.get('/:user/:password/delete/:id', function(req, res) {
    clasen = new noticia(req, res)
    clasen.delete(req, res)
});

router.get('/:user/:password/mostrar/:id?', function(req, res) {
    // clasen = new noticia(req, res)
    clasen.mostrar(req, res)

});

module.exports = router;
var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/cadastrarQuiz", function (req, res) {
    usuarioController.cadastrarQuiz(req,res);
});

// Rota para obter a quantidade de usuários
router.get("/contarUsuarios", function(req, res) {
    usuarioController.contarUsuarios(req, res);
});

router.get("/mediaFilmesAssistidosMes", function(req, res) {
    usuarioController.mediaFilmesAssistidosMes(req, res);
});

router.get("/porcentagemUsuariosInfluenciados", function(req, res) {
    usuarioController.porcentagemUsuariosInfluenciados(req, res);
});

router.get("/distribuicaoGenerosFavoritos", function(req, res) {
    usuarioController.distribuicaoGenerosFavoritos(req, res);
});


module.exports = router;
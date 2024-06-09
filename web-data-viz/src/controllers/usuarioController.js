var usuarioModel = require("../models/usuarioModel");
//var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var email = req.body.emailOuNicknameServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está indefinido!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then
            (
                function (resultadoAutenticar) 
                {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) 
                    {
                        console.log("Entrei");
                        console.log(resultadoAutenticar);

                                if (resultadoAutenticar.length > 0) 
                                {
                                    res.json({
                                        id: resultadoAutenticar[0].id,
                                        email: resultadoAutenticar[0].email,
                                        nome: resultadoAutenticar[0].nome,
                                        senha: resultadoAutenticar[0].senha,
                                    });
                                } 
                                else 
                                {
                                    res.status(204).json({ aquarios: [] });
                                }
                    } 
                    else if (resultadoAutenticar.length == 0) 
                    {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } 
                    else 
                    {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                
                }
            )
            .catch
            (
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var dataNascimento = req.body.dataNascimentoServer;
    var cpf = req.body.cpfServer;
    var nickname = req.body.nicknameServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (dataNascimento == undefined) {
        res.status(400).send("Sua data de nascimento está undefined!");
    } else if (nickname == undefined) {
        res.status(400).send("Seu nickname está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else {
        usuarioModel.cadastrar(nome, email, senha, dataNascimento, cpf, nickname)
            .then(function (resultado) {
                res.json(resultado);
            }).catch(function (erro) {
                if (erro.message === "Email duplicado") {
                    res.status(409).send("Email já está em uso.");
                } else if (erro.message === "CPF duplicado") {
                    res.status(409).send("CPF já está em uso.");
                } else if (erro.message === "Nickname duplicado") {
                    res.status(409).send("Nickname já está em uso.");
                } else {
                    console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            });
    }
}

function cadastrarQuiz(req, res)
{
    var qtdAssistidoMes = req.body.qtdAssistidoMesServer;
    var influenciaFilme = req.body.influenciaFilmesServer;
    var producoesFavoritas = req.body.producoesFavoritasServer;
    var generos = req.body.generosServer;
    var topicos = req.body.topicosServer;

    // Faça as validações dos valores
    if (qtdAssistidoMes == undefined) {
        res.status(400).send("Seu quantidade de assistidos no més está undefined!");
    } else if (influenciaFilme == undefined) {
        res.status(400).send("Sua influência está undefined!");
    } else if (producoesFavoritas == undefined) {
        res.status(400).send("Suas produções favoritas estão undefined!");
    } else if (generos == undefined) {
        res.status(400).send("Seu gênero está undefined!");
    } else if(topicos == undefined) {
        res.status(400).send("Seus topicos estão undefined!");
    } else 
    {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarQuiz(qtdAssistidoMes, influenciaFilme, producoesFavoritas, generos,topicos)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function contarUsuarios(req,res)
{
    usuarioModel.contarUsuarios()
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
}

function mediaFilmesAssistidosMes(req,res)
{
    usuarioModel.mediaFilmesAssistidosMes()
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
}

function porcentagemUsuariosInfluenciados(req,res)
{
    usuarioModel.porcentagemUsuariosInfluenciados()
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
}


function distribuicaoGenerosFavoritos(req,res)
{
    usuarioModel.distribuicaoGenerosFavoritos()
    .then(
        function (resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}




module.exports = {
    autenticar,
    cadastrar,
    contarUsuarios,
    cadastrarQuiz,
    mediaFilmesAssistidosMes,
    porcentagemUsuariosInfluenciados,
    distribuicaoGenerosFavoritos
}
var database = require("../database/config")


function autenticar(emailOuNickname, senha) 
{
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", emailOuNickname, senha)
    var instrucaoSql = `
        SELECT idUsuario, nome, email, nickname, dataNascimento 
        FROM usuario 
        WHERE (email = '${emailOuNickname}' OR nickname = '${emailOuNickname}') 
        AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function verificarEmail(email) 
{
    var instrucaoSql = `SELECT COUNT(*) as count FROM usuario WHERE email = '${email}';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function verificarCpf(cpf) 
{
    var instrucaoSql = `SELECT COUNT(*) as count FROM usuario WHERE cpf = '${cpf}';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function verificarNickname(nickname) 
{
    var instrucaoSql = `SELECT COUNT(*) as count FROM usuario WHERE nickname = '${nickname}';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha, dataNascimento, cpf, nickname) 
{
    return verificarEmail(email).then(resultadoEmail => {
        if (resultadoEmail[0].count > 0) {
            return Promise.reject(new Error("Email duplicado"));
        } else {
            return verificarCpf(cpf).then(resultadoCpf => {
                if (resultadoCpf[0].count > 0) {
                    return Promise.reject(new Error("CPF duplicado"));
                } else {
                    return verificarNickname(nickname).then(resultadoNickname => {
                        if (resultadoNickname[0].count > 0) {
                            return Promise.reject(new Error("Nickname duplicado"));
                        } else 
                        {
                            var instrucaoSql = `
                                INSERT INTO usuario (nome, email, senha, dataNascimento, cpf, nickname) 
                                VALUES ('${nome}', '${email}', '${senha}', '${dataNascimento}', '${cpf}', '${nickname}');
                            `;
                            return database.executar(instrucaoSql);
                        }
                    });
                }
            });
        }
    });
}


function cadastrarQuiz(qtdAssistidoMes,influenciaFilmes,producoesFavoritas,generos,topicos)
{
    var instrucaoSql = 
    `
        INSERT INTO quiz (qtdAssistidoMes, influenciaFilme, producoesFavoritas, generoFavorito, tipoProducaoFavorita) 
        VALUES ('${qtdAssistidoMes}', '${influenciaFilmes}', '${producoesFavoritas}', '${generos}', '${topicos}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

//Obter dados para a dashboard

function contarUsuarios() 
{
    var instrucaoSql = `SELECT COUNT(*) as count FROM usuario;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function mediaFilmesAssistidosMes() 
{
    var instrucaoSql = `SELECT ROUND(AVG(qtdAssistidoMes), 1) as media FROM quiz;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function porcentagemUsuariosInfluenciados() 
{
    var instrucaoSql = `SELECT ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM quiz), 1) as porcentagem FROM quiz WHERE influenciaFilme = 'sim';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function distribuicaoGenerosFavoritos() 
{
    var instrucaoSql = `SELECT generoFavorito, COUNT(*) as count FROM quiz GROUP BY generoFavorito;`;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    autenticar,
    cadastrar,
    contarUsuarios,
    cadastrarQuiz,
    mediaFilmesAssistidosMes,
    porcentagemUsuariosInfluenciados,
    distribuicaoGenerosFavoritos
};
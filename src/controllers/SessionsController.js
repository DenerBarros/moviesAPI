// Importando a conexão com o banco de dado
const knex = require("../database/knex");

// Importando mensagem de erro
const AppError = require("../utils/AppError");

// Importando uma função do BCRYPT para fazer a comparação das senhas criptografadas
const { compare } = require("bcryptjs");

// Importando a configuração do JSW criada em configs/auth.js
const authConfig = require("../configs/auth")

// Importando um método de dentro de jsonwebtoken
const { sign } = require("jsonwebtoken")


class SessionsController {
    async create (request, response){
        const { email, password } = request.body;
        
        // Utilizando o Knex para acessar a tabela de users e fazer um filtro de email
        const user = await knex("users").where({email}).first();

        // Fazendo a validação
        // Caso o usuário não exista
        if(!user){
            throw new AppError("E-mail e/ou senha incorreta", 401);
        }


        // Fazendo a comparação da senha digitada com a senha que consta no banco de dados
        // Como o user já foi fazer a conexão com o banco da dados, vamos utilizar ele para fazer a validação da senha e também, o método COMPARE do bcrypt
        const passwordMatched = await compare(password, user.password)

        if(!passwordMatched){
            throw new AppError("E-mail e/ou senha incorreta", 401);
        }


        // Fazendo a criaçaõ do token de autenticação
        // Fazendo com a desestruturação a atribuição dos elementos do objeto
        const { secret, expiresIn } = authConfig.jwt

        // Criando o token
        const token = sign({}, secret, {
            subject: String(user.id), // Inserindo dento do token o id capturado
            expiresIn // Validando o token
        })

        return response.json({user, token});
    }
}


module.exports = SessionsController;
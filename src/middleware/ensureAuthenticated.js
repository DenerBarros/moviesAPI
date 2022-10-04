// Importando a função verify do jsonWebToken
const { verify } = require("jsonwebtoken");

// Importando o AppError
const AppError = require("../utils/AppError");

// Importando as configurações de autenticação
const authConfig = require("../configs/auth");

// Função Middleware
function ensureAuthenticated(request, response, next){
    // request.headers.authorization é o local em que se encontra o token de autorização
    const authHeader = request.headers.authorization;

    // verificando se o token existe
    if(!authHeader){
        throw new AppError("JWT Token não informado",401);
    }

    // Caso o token exista
    // Fazendo a separação a partir de um espaço e adicionando na segunda posição do vetor
    const [, token] = authHeader.split(" ");

    try{
        // Se o token existe, fazendo a verificação se é um token válido
        // Desestruturando o verify e buscando o parâmetro SUB e dizendo que sub é user_id (um apelido) agora
        const { sub: user_id } = verify(token, authConfig.jwt.secret);

        // Criando request.user com uma propriedade chamada de ID e adicionado o user_id que veio do verify
        request.user = {
            id: Number(user_id),
        };

        // Chamando a próxima função (next)
        return next();

    } catch {
        // Caso o token seja inválido
        throw new AppError("JWT Token inválido", 401);
    }
}

module.exports = ensureAuthenticated;
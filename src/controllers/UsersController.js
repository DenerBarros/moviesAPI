// importando a função que vai gerar a criptografia da senha
const { hash, compare } = require ("bcryptjs"); 

// Importando o AppError
const AppError = require("../utils/AppError");

// Importando a conexão com o banco de dados
const sqliteConnection = require("../database/sqlite");

// Camada que vai executar o que o usuário solicitou pela requisição

class UsersController {
    // Classe permite ter várias funções

    // Função "CREATE" para criar um usuário
    async create (request, response) {
        // obtendo as informações enviadas pela requisição
        const { name, email, password } = request.body;
        
        // fazendo a conexão com o banco de dados
        const database = await sqliteConnection();

        // Checando se o usuário já tem um email existente antes de fazer o cadastro
        const checkUserExist = await database.get("SELECT * FROM users WHERE email = (?)",
        [email]);
        if(checkUserExist){
            throw new AppError("Este e-mail já está em uso.");
        }

        const hashedPassword = await hash(password, 8);

        // Adicionando o usuário na tabela
        await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword]);

        return response.status(201).json();
    }

    async update(request, response) {
        const { name, email, password, old_password } = request.body;
        const user_id = request.user.id;

        const database = await sqliteConnection();
        // Selecionando o usuário apartir de sua primary key (id)
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

        // Caso o usuário não exista (!user)
        if(!user){
            throw new AppError("Usuário não encontrado");
        }

        // Conferindo se o usuário não está tentando trocar o email para um email já em uso
        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email =(?)", [email]);

        // Se encontrar esse email e esse email do id for diferente da id do usuário
        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
            throw new AppError ("Este e-mail já está em uso.")
        }

        user.name = name ?? user.name;  // ?? significa  que se não houver conteúdo no novo name, será deixado o que já estava lá no banco de dados (OU É NAME OU É USER.NAME)
        user.email = email ?? user.email;

        // ALTERANDO A SENHA
        // Se não for informado a senha antiga:
        if( password && !old_password){
            throw new AppError("Você precisa informar a senha antiga para poder criar uma nova senha.");
        }

        // Se tanto a nova senha quanto a senha antiga forem informados
        if( password && old_password){
            const checkOldPassword = await compare(old_password, user.password); 
            // user.password = password de dentro do usuário

            if(!checkOldPassword){
                throw new AppError("A senha antiga não confere.");
            }

            user.password = await hash(password,8);
        }


        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`,
            [user.name, user.email, user.password, user_id]
            );

        return response.status(200).json();

    }
    
}


module.exports = UsersController;
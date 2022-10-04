const knex = require("../database/knex");
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

class UserAvatarController{
    async update(request, response){
        const user_id = request.user.id;
        const avatarFileName = request.file.filename;

        // Instanciando o diskstorage
        const diskStorage = new DiskStorage()

        const user = await knex("users") // knex ir na tabela de tags
        .where({ id: user_id }).first(); // busca por usuários onde o id é igual ao user_id


        // verificando se o usuário não existe
        if(!user){
            throw new AppError("Somente autenticados podem mudar o avatar", 401)
        }

        // Verificando se já existe um avatar dentro do usuário, se existir, deletar a foto anterior
        if(user.avatar){
            await diskStorage.deleteFile(user.avatar)
        }

        // Caso não exista uma foto
        const filename = await diskStorage.saveFile(avatarFileName)
        user.avatar = filename

        // Salvando
        await knex("users").update(user).where({id: user_id}) // .where({id: user_id}) para atualizar somente um usuário

        return response.json(user)
    }

}

module.exports = UserAvatarController; 
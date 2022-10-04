// Importando o fs do próprio node que é para lidar com manipulação de arquivos
const fs = require("fs");
// Importando o path do próprio node para lidar com diretórios
const path = require("path");

// Fazendo o upload das configurações de upload
const uploadConfig = require("../configs/upload")

// Classe que vai conter duas funcionalidades:
// 1- Salvar o arquivo e 2- Deletar o arquivo
class DiskStorage{
    async saveFile(file){
        await fs.promises.rename(
            // mudando o arquivo de lugar
            path.resolve(uploadConfig.TMP_FOLDER, file),
            path.resolve(uploadConfig.UPLOADS_FOLDER, file)
        );

        return file;
    }

    async deleteFile(file){
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

        // tratando possíveis erros
        try{
            await fs.promises.stat(filePath);
        } catch{
            return;
        }

        //Deletando um arquivo
        await fs.promises.unlink(file)
    }
}


module.exports = DiskStorage; 
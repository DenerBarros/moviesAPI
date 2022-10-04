const path = require("path"); // importando o path do node
const multer = require("multer"); // importando o multer para upload
const crypto = require("crypto"); // Importando o crypto

// Adicionando o path para gerenciar o diretório do TMP_FOLDER
const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");

// Pasta onde os arquivos irão ficar
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");

const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_FOLDER,
        filename(request, file, callback){
            const fileHash = crypto.randomBytes(10).toString("hex");
            const filename = `${fileHash}-${file.originalname}`;
            return callback(null,filename)
        },
    }),
};

module.exports = {
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER
}
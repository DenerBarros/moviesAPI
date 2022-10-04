// Importando
const migrationsRun = require("./database/sqlite/migrations");

// Importando a biblioteca do express async errors
require("express-async-errors");

require("dotenv/config")

// Importando o APP ERROR
const AppError = require("./utils/AppError")

const uploadConfig = require("./configs/upload") // Importando as configurações de upload

// Importando o cors
const cors = require("cors")
// Importando o express e armazenando na constante express
const express = require("express");
// Importando do index.js de routes a função routes que é executada quando algo é enviado pelo /users
const routes = require("./routes");

migrationsRun();


// Criando a constante app para chamar a express que foi importada
const app = express();
app.use(cors())
app.use(express.json());
app.use(routes);

// Buscando o arquivo da foto do usuário
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))


app.use( ( error, request, response, next ) => {
    // sabendo de onde vem o erro, se for do lado do cliente
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }
    
    console.error(error);

    // caso seja um erro do lado do servidor
    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    });
})

const PORT = process.env.PORT || 3333;

app.listen(PORT, () =>
    console.log(`server is running on PORT ${PORT}`)
);
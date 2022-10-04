const { Router } = require("express");

const multer = require("multer");
const uploadConfig = require("../configs/upload")

// importando o UserControlller da pasta controllers
const UsersControlller = require("../controllers/UsersController");
// Importando o controller de avatar
const UserAvatarController = require("../controllers/UserAvatarController");

// Inicializando a função ROUTER que veio do express e armazenando na constante usersRouters
const usersRoutes = Router();


// Importando o MIDDLEWARE de autenticação
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

// upload será a constante de inicialização do multer com as configurações
const upload = multer(uploadConfig.MULTER)

// Instanciando
const usersController = new UsersControlller(); // Instanciando o UserController
const userAvatarController = new UserAvatarController();


// Método POST
usersRoutes.post("/", usersController.create);  // usersController tem a propriedade create que é a função criada

// método PUT para update do usuário

usersRoutes.put("/", ensureAuthenticated, usersController.update);
// qnd for acessada a rota, entrará o ensureAuthenticated para verificar e só depois (next) irá para o update

// Atualizando um campo específico. Neste caso, o campo de avatar
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)


module.exports = usersRoutes;
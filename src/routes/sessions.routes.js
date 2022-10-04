// Importando o método Routes do express
const { Router } = require("express");

// Importando o SessionsController
const SessionsController = require("../controllers/SessionsController");

// Instanciando o SessionController
const sessionsController = new SessionsController();

// Criando uma constante pra receber a inicialização do Router do express
const sessionsRouter = Router ();


// Fazendo o redirecionamento da rota para ir diretamente ao .create do SessionsController
sessionsRouter.post("/", sessionsController.create);


module.exports = sessionsRouter;
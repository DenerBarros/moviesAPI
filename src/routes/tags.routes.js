const { Router } = require("express");

const TagsController = require("../controllers/TagsController")



// Importando o MIDDLEWARE de autenticação
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const tagsRoutes = Router();

const tagsController = new TagsController();


tagsRoutes.get("/", ensureAuthenticated, tagsController.index);

module.exports = tagsRoutes;
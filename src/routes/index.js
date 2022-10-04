// importando do express o ROUTER
const { Router } = require("express");

const routes = Router();

routes.use("/users", usersRouter);

module.exports = routes;
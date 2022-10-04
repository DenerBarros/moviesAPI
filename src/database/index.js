// importanto as configurações do knex
const config = require("../../../knexfile");

// importando o knex
const knex = require("knex")

const connection = knex(config.development); // Dizendo para connection quais são as configurações de conexão

module.exports = connection;
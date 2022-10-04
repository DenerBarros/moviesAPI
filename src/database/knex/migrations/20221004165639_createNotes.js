exports.up = knex => knex.schema.createTable("notes", table => {

    // campos da tabela
    table.increments("id"); // Campo ID incremental dentro da tabela notes
    table.text("title"); // text pq é do tipo texto
    table.text("description");
    table.integer("rating"); // inteiro para guardar a nota do filme
    table.integer("user_id").references("id").inTable("users");
    // table.integer("user_id") = criando um campo do tipo inteiro com nome de user_id
    // E esse user_id ele faz uma referência a um ID existente dentro da tabela users
    // Ou seja, a nota estará vinculada a um usuário existente

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
    // .default(knex.fn.now()) = busca o tempo atual

});  


// exports.down = function(knex) {};
// down deleta tabela
exports.down = knex => knex.schema.dropTable("notes"); 
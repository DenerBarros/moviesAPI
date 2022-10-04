exports.up = knex => knex.schema.createTable("tags", table => {

    // campos da tabela
    table.increments("id");
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users");
    table.text("name").notNullabel;

});  


exports.down = knex => knex.schema.dropTable("tags");
exports.up = (knex) =>
  knex.schema.createTable("movie_tags", (table) => {
    table.increments("id").primary();
    table.text("name").notNullable();
    table.integer("note_id").references("id").inTable("movie_notes").onDelete("CASCADE");
    table.integer("user_id").references("user_id").inTable("movie_notes").onDelete("CASCADE");
  });

exports.down = (knex) => knex.schema.dropTable("movie_tags");

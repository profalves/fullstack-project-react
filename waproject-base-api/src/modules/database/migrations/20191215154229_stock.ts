import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Stock', table => {
    table.increments('id').primary();
    table.string('name', 50).notNullable();
    table.float('quantity', 5, 2).notNullable();
    table.float('price', 5, 2).notNullable();
    table.dateTime('createdDate').notNullable();
    table.dateTime('updatedDate').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Stock');
}

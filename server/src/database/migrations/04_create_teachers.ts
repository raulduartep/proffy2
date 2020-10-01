import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('teachers', table => {
        table.increments('id').primary();
        table.string('whatsapp').notNullable().unique();
        table.text('bio').notNullable();
        table.string('avatar');

        table.integer('user_id')
            .notNullable()
            .unique()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('teachers');
}
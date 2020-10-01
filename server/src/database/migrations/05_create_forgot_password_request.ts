import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('allowlist_forgot_password_requests', table => {
        table.increments('id').primary();
        table.string('token').notNullable().unique();
        table.timestamp('expires').notNullable();
        
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('allowlist_forgot_password_requests');
}
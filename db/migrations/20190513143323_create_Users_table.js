
exports.up = function (knex, Promise) {
    console.log('Creating users table...');
    return knex.schema.createTable('users', (usersTable) => {
        usersTable.string('username').primary().unique();
        usersTable.string('avatar_url');
        usersTable.string('name').notNullable();
    })

};

exports.down = function (knex, Promise) {
    console.log('Removing users table...');
    return knex.schema.dropTable('users');
};


exports.up = function (knex, Promise) {
    console.log('Creating topics table...');
    return knex.schema.createTable('topics', (topicsTable) => {
        topicsTable.string('slug').primary().unique();
        topicsTable.string('description').notNullable();
        topicsTable.string('imgURL')
    });
};

exports.down = function (knex, Promise) {
    console.log('Removing topics table...');
    return knex.schema.dropTable('topics');
};


exports.up = function (knex, Promise) {
    console.log('creating comments table...');
    return knex.schema.createTable('comments', (commentsTable) => {
        commentsTable.increments('comment_id').primary();
        commentsTable.string('author').references('users.username');
        commentsTable.integer('article_id').references('articles.article_id');
        commentsTable.integer('votes').defaultsTo(0);
        commentsTable.datetime('created_at').defaultsTo(knex.fn.now(6));
        commentsTable.text('body').notNullable();

    })

};

exports.down = function (knex, Promise) {
    console.log('Removing comments Table...');
    return knex.schema.dropTable('comments');

};

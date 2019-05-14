
exports.up = function (knex, Promise) {
  console.log('Creating articles table...');
  return knex.schema.createTable('articles', (articlesTable) => {
    articlesTable.increments('article_id').primary();
    articlesTable.string('title').notNullable();
    articlesTable.text('body').notNullable();
    articlesTable.integer('votes').defaultTo(0);
    articlesTable.string('topic').references('topics.slug');
    articlesTable.string('author').references('users.username');
    articlesTable.datetime('created_at').defaultsTo(knex.fn.now(6));
  });
};

exports.down = function (knex, Promise) {
  console.log('Removing articles table...');
  return knex.schema.dropTable('articles');
};

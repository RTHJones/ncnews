const { articlesData, usersData, commentsData, topicsData } = require('../data');
const { timeConverter } = require('../utils.js')

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex('topics')
        .insert(topicsData)
        .returning('*');
    })
    .then((topicRows) => {
      let usersPromise = knex('users')
        .insert(usersData)
        .returning('*')
      return Promise.all([usersPromise, topicRows])
    })
    .then(([userRows, topicRows]) => {
      console.log(mystery);
      convertedArticlesData = timeConverter(articlesData)

      return knex('articles')
        .insert(convertedArticlesData)
        .returning('*')
    })
    .then(() => {
      convertedCommentsData = timeConverter(commentsData)
      return knex('comments')
        .insert(convertedCommentsData)
        .returning('*')
    })
};

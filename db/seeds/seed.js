const { articlesData, usersData, commentsData, topicsData } = require('../data');
const { timeConverter, articleIdLookup, fieldConverter, articleIdReferencer } = require('../utils.js')

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
      return knex('users')
        .insert(usersData)
        .returning('*')
    })
    .then(() => {
      const convertedArticlesData = timeConverter(articlesData)
      return knex('articles')
        .insert(convertedArticlesData)
        .returning('*')
    })
    .then((articleRows) => {
      const timeConvertedCommentsData = timeConverter(commentsData);
      const fieldAndTimeCorrectedCommentsData = fieldConverter(timeConvertedCommentsData)
      const idObj = articleIdLookup(articleRows)
      const convertedComments = articleIdReferencer(fieldAndTimeCorrectedCommentsData, idObj)
      return knex('comments')
        .insert(convertedComments)
        .returning('*')
    })
};

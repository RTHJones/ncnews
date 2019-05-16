const connection = require('../connection.js')


exports.fetchAllArticles = ({ sort_by, order, author, topic }) => {
    return connection
        .select(
            'articles.author',
            'title',
            'articles.article_id',
            'topic',
            'articles.created_at',
            'articles.votes'
        )
        .from('articles')
        .modify((qb) => {
            if (author) {
                qb.where('articles.author', author)
            }
            if (topic) {
                qb.where('articles.topic', topic)
            }
        })
        .count({ 'comment_count': 'comments.article_id' })
        .leftJoin('comments', 'articles.article_id', 'comments.article_id')
        .groupBy('articles.article_id')
        .orderBy(sort_by || 'title', order || 'desc')
};
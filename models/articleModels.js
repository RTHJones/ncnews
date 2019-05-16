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

exports.fetchArticleById = ({ article_id }) => {
    return connection
        .select(
            'articles.author',
            'title',
            'articles.article_id',
            'articles.body',
            'topic',
            'articles.created_at',
            'articles.votes')
        .from('articles')
        .where('articles.article_id', article_id)
        .count({ 'comment_count': 'comments.article_id' })
        .leftJoin('comments', 'articles.article_id', 'comments.article_id')
        .groupBy('articles.article_id')
}

exports.fetchArticleAndPatch = ({ article_id }, { inc_votes }) => {
    return connection('articles')
        .where({ 'article_id': article_id })
        .increment({ 'votes': inc_votes })
        .returning('*')
}

exports.fetchCommentsByArticleId = ({ article_id }, { sort_by, order }) => {
    return connection
        .select(
            'comment_id',
            'votes',
            'created_at',
            'author',
            'body'
        )
        .from('comments')
        .where({ 'article_id': article_id })
        .orderBy(sort_by || 'created_at', order || 'desc')
}

exports.postNewComment = ({ article_id }, { username, body }) => {
    return connection('comments')
        .insert({ 'author': username, 'body': body, 'article_id': article_id })
        .returning('*')
}
const connection = require('../connection.js')

exports.changeVote = ({ comment_id }, { inc_votes }) => {

    return connection('comments')
        .where({ 'comment_id': comment_id })
        .increment({ 'votes': inc_votes || 0 })
        .returning('*')
}

exports.commentDeleter = ({ comment_id }) => {
    return connection('comments')
        .where({ 'comment_id': comment_id })
        .del()
        .returning('*')
}
exports.checkCommentExists = (comment_id) => {
    return connection
        .select('*')
        .from('comments')
        .where({ 'comment_id': comment_id })
        .returning('*')
}
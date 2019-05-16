const connection = require('../connection.js')

exports.changeVote = ({ comment_id }, { inc_votes }) => {

    return connection('comments')
        .where({ 'comment_id': comment_id })
        .increment({ 'votes': inc_votes })
        .returning('*')
}

exports.commentDeleter = ({ comment_id }) => {
    return connection('comments')
        .where({ 'comment_id': comment_id })
        .del()
        .returning('*')
}
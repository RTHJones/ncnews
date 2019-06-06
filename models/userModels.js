const connection = require('../connection.js')

exports.fetchAllUsers = ({ order, sort_by, limit = 10, p = 1 }) => {
    return connection
        .select('*')
        .from('users')
        .orderBy(sort_by || 'username', order || 'asc')
        .offset((p - 1) * limit)
        .limit(limit)

}

exports.fetchUserByUsername = ({ username }) => {
    return connection
        .select('*')
        .from('users')
        .where({ 'username': username })
        .returning('*')
}
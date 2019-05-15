const connection = require('../connection.js')


exports.fetchAllTopics = () => {
    return connection.select('*').from('topics');
};



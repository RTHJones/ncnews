const connection = require('../connection.js')


exports.fetchAllTopics = () => {
    return connection.select('*').from('topics');
};


exports.createTopic = ({ slug, description }) => {
    return connection('topics')
        .insert({ 'slug': slug, 'description': description })
        .returning('*')
}


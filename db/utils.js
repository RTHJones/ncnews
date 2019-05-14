const timeConverter = (arr) => {
    return arr.map(item => {
        let temp = { ...item }
        temp.created_at = new Date(temp.created_at).toDateString();
        return temp
    })
}

const articleIdLookup = (articleRows) => {

}

const topicIdLookup = () => {

}

const userIdLookup = () => {

}

module.exports = { timeConverter }
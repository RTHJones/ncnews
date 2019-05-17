const timeConverter = (arr) => {
    return arr.map(item => {
        let temp = { ...item }
        temp.created_at = new Date(temp.created_at)
        return temp
    })
}

const articleIdLookup = (articleRows) => {
    let obj = {};
    articleRows.forEach(element => {
        let temp = { ...element };
        obj[temp.title] = temp.article_id
        return temp
    })
    return obj
}

const fieldConverter = (arr) => {
    return arr.map(item => {
        let temp = { ...item }
        temp.author = temp.created_by;
        delete temp.created_by
        return temp
    })
}

const articleIdReferencer = (commentData, lookupObj) => {
    let newData = commentData.map(comment => {
        let temp = { ...comment };
        temp.article_id = lookupObj[temp.belongs_to]
        delete temp.belongs_to
        return temp
    })
    return newData
}




module.exports = {
    timeConverter,
    articleIdLookup,
    fieldConverter,
    articleIdReferencer
}
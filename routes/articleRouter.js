const articleRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');

articleRouter
    .route('/')
    .get((req, res) => res.send('all ok from articleRouter'))
    .all(methodNotAllowed);


module.exports = articleRouter;
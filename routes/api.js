const apiRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const { topicRouter, articleRouter, commentRouter, userRouter } = require('./');


apiRouter.use('/topics', topicRouter);
apiRouter.use('/articles', articleRouter)
apiRouter.use('/comments', commentRouter);
apiRouter.use('/users', userRouter);

apiRouter
  .route('/')
  .get((req, res) => res.send({
    '/users': 'username',
    '/articles': 'atricle_id',
    '/comments': 'comment_id',
    '/topics/': 'returns all topics'
  }})
    .all(methodNotAllowed);



module.exports = apiRouter;

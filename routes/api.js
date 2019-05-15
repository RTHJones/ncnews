const apiRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const { topicRouter, articleRouter, commentRouter, userRouter } = require('./');


apiRouter.use('/topics', topicRouter);
apiRouter.use('/articles', articleRouter)
apiRouter.use('/comments', commentRouter);
apiRouter.use('/users', userRouter);

apiRouter
  .route('/')
  .get((req, res) => res.send({ ok: true }))
  .all(methodNotAllowed);



module.exports = apiRouter;

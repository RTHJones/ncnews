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
    'api/users/:username': {
      'GET': 'returns user details for that username'
    },
    'api/articles': {
      'GET': {
        '/:article_id': 'returns a specific article',
        '/': 'returns all articles',
        '/:article_id/comments': 'returns all comments for a specific article'
      },
      'PATCH': {
        '/articles?inc_votes=1': 'increases vote count on specific article'
      },
      'POST': {
        '/:article_id/comments?username=:username&body=commenttext': 'adds comment body to specific article and attributes it to username'
      }
    },
    'api/comments': {
      'GET': {
        '/:comment_id': 'returns a specific comment'
      },
      'DELETE': {
        '/comment_id': 'deletes a specific comment and logs that comment to the console for confirmation'
      },
    },
    'api/topics/': {
      'GET': 'returns all topics'
    }
  }))
  .all(methodNotAllowed);



module.exports = apiRouter;

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
    'api/users': {
      'GET': {
        '/': 'returns a list of all users, take page(p), limit, order, and sort_by queries',
        '/:username': 'returns user details for that username'
      },
      'POST': {
        '/': 'allows creation of new user in database, requires user details in request body - {name, username}, also accepts {img url} in body'
      }
    },
    'api/articles': {
      'GET': {
        '/:article_id': 'returns a specific article',
        '/': 'returns all articles, accepts sort_by, author, topic, order asc/desc, limit and p (page number) queries',
        '/:article_id/comments': 'returns all comments for a specific article, accepts limit, p (page number) sort_by & order asc/desc queries'
      },
      'PATCH': {
        '/:article_id': 'increases vote count on specific article, when sent "inc_votes" value in body of request'
      },
      'POST': {
        '/:article_id/comments': 'adds comment body to specific article and attributes it to username, when passed "username" and "body" values in body of request'
      },
      'DELETE': {
        '/:article_id': 'deletes a specific article and console logs the deleted article'

      }
    },
    'api/comments': {
      'GET': {
        '/:comment_id': 'returns a specific comment'
      },
      'PATCH': {
        '/:comment_id': 'requires inc_votes object in body, changes article votes by that value'
      },
      'DELETE': {
        '/comment_id': 'deletes a specific comment and logs that comment to the console for confirmation'
      },
    },
    'api/topics/': {
      'GET': {
        '/': 'returns all topics',
      },
      'POST': {
        '/': 'requires slug and description fields in body, allows creation of new topic and returns that topics details as JSON'
      }
    }
  }))
  .all(methodNotAllowed);



module.exports = apiRouter;

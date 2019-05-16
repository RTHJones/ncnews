process.env.NODE_ENV = 'test';
const chai = require('chai');
const { expect } = chai;
const request = require('supertest');
const chaiSorted = require('chai-sorted');
const app = require('../app');
const connection = require('../db/connection');
chai.use(chaiSorted);

describe('/', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe('/api', () => {
    it('GET status:200', () => {
      return request(app)
        .get('/api')
        .expect(200)
        .then(({ body }) => {
          expect(body.ok).to.equal(true);
        });
    });
    describe('/topics', () => {
      it('responds with an array of topic objects, each having slug and description properties', () => {
        return request(app)
          .get('/api/topics')
          .expect(200)
          .then(res => {
            expect(res.body.topics).to.be.an('array');
            expect(res.body.topics[0]).to.contain.keys('slug', 'description')
          });
      });
    })
    describe('/articles', () => {
      it('responds with an array of article objects, each having author, title, article_id, topic, created_at, votes, comment_count properties', () => {
        return request(app)
          .get('/api/articles')
          .expect(200)
          .then(res => {
            expect(res.body.articles).to.be.an('array');
            expect(res.body.articles[0]).to.contain.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count')
          });
      });
      it('accepts queries and sorts by default values', () => {
        return request(app)
          .get('/api/articles?sort_by=title')
          .expect(200)
          .then(res => {
            expect(res.body.articles).to.be.sortedBy('title', { descending: true });
          });
      });
      it('accepts queries and sorts appropriately when passed other sort criteria', () => {
        return request(app)
          .get('/api/articles?sort_by=votes&order=asc')
          .expect(200)
          .then(res => {
            expect(res.body.articles).to.be.sortedBy('votes', { descending: false });
          });
      });
      it('filters by author', () => {
        return request(app)
          .get('/api/articles?author=butter_bridge')
          .expect(200)
          .then(res => {
            expect(res.body.articles[0].author).to.equal('butter_bridge');
          });
      });
      it('filters by topic', () => {
        return request(app)
          .get('/api/articles?topic=cats')
          .expect(200)
          .then(res => {
            expect(res.body.articles[0].topic).to.equal('cats');
          });
      });
    });
    describe('/articles/:article_id', () => {
      it('returns the correct article with the correct properties', () => {
        return request(app)
          .get('/api/articles/11')
          .expect(200)
          .then(res => {
            expect(res.body.article).to.be.an('array');
            expect(res.body.article[0]).to.contain.keys('author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes', 'comment_count')
          });
      });
      it('returns the comments for the correct article, with the correct object properties', () => {
        return request(app)
          .get('/api/articles/1/comments')
          .expect(200)
          .then(res => {
            console.log(res.body.comments)
            expect(res.body.comments).to.be.an('array');
            expect(res.body.comments[0]).to.contain.keys('author', 'comment_id', 'body', 'created_at', 'votes')
          });
      });
      it('posts comment to the correct article, and returns that comment', () => {
        return request(app)
          .post('/api/articles/2/comments?username=rogersop&body=thisismysecondcommentpost')
          .expect(200)
          .then(res => {
            console.log(res.body.comments)
            expect(res.body.comments).to.be.an('array');
            expect(res.body.comments[0]).to.contain.keys('author', 'comment_id', 'article_id', 'body', 'created_at', 'votes')
          });
      });
    })
    describe('/comments', () => {
      it('changes votes on a comment and returns that comment', () => {
        return request(app)
          .patch('/api/comments/1?inc_votes=100')
          .expect(200)
          .then(res => {
            expect(res.body.comment).to.be.an('array');
            expect(res.body.comment[0]).to.contain.keys('author', 'article_id', 'comment_id', 'votes', 'created_at', 'body')
            expect(res.body.comment[0].votes).to.equal(116)
          });
      });
    })
  });
});

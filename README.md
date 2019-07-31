# **READ ME**
---
## *'robins-nc-news'/'developing news'*

This is a demonstration app (back end) developed by Robin Jones whilst studying at Northcoders Manchester. It provides articles, comments, and (for logged in users) the ability to add, remove and vote on those articles and comments. The database and api are hosted and accessible via heroku at the address below:

---
https://robins-nc-news.herokuapp.com

---

## Accessing the api

A GET request sent to the above address + /api will return a JSON object detailing the available endpoints, the type of requests they will accept, and the data that will be returned. 

---

## Forking and Cloning

The project can be forked and cloned to a local machine, where various scripts can be run as detailed below. The database used is [psql](https://www.postgresql.org/), connections are managed by [Knex](https://knexjs.org), [node](https://nodejs.org/en/) /[npm](https://www.npmjs.com/) is used to run scripts, live reloading for the server is handled with [nodemon](https://www.npmjs.com/package/nodemon), and [Insomnia](https://insomnia.rest/) should be installed in order to make requests to localhost. The project was originally constructed using [Yo](https://www.npmjs.com/package/yo) and [Knexpress](https://www.npmjs.com/package/generator-knexpress).

A new knexfile.js should be added to the root directory to deal with the connection setup and config. The one used locally to create the project has not been included in the git commits and uploads.




## Running the Test Suite
The test suite uses [supertest](https://www.npmjs.com/package/supertest),  [chai](https://www.chaijs.com/) and [chai-sorted](https://www.npmjs.com/package/chai-sorted).
 


---

## Available Scripts

Create development and test databases locally:

```bash
npm run setup-dbs
```

Run tests:

```bash
npm test
```

Run the server with `nodemon`, for hot reload:

```bash
npm run dev
```

Run the server with `node`:

```bash
npm start
```

---
## License
This project is not licensed by me in any way, but it *is* forked from a private Northcoders repo which has its own terms and conditions.
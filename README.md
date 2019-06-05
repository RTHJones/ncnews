# **READ ME**

## for 'robins-nc-news'

This is a demonstration app (back end) developed by Robin Jones whilst studying at Northcoders Manchester. It provides articles, comments, and (for logged in users) the ability to add, remove and vote on those articles and comments. The database and api are hosted and accessible via heroku at the address below:

---
https://robins-nc-news.herokuapp.com

---

## Accessing the api

A GET request sent to the above address + /api will return a JSON object detailing the available endpoints, the type of requests they will accept, and the data that will be returned. 

---

## Forking and Cloning

The project can be forked and cloned to a local machine, where various scripts can be run as detailed below. The user will need to have psql, node, nodemon, and ideally insomnia installed in order to conduct tests and run this project. 

A new knexfile.js should be added to the root directory to deal with the connection setup and config. The one used locally to create the project has not been included in the git commits and uploads.

---

## Available Scripts

Create development and test databases locally:

```bash
npm run setup-dbs
```

Create a new migration file:

```bash
npm run migrate-make <filename>
```

Run all migrations:

```bash
npm run migrate-latest
```

Rollback all migrations:

```bash
npm run migrate-rollback
```

Run tests:

```bash
npm test
```

Rollback, migrate -> latest, then start inserting data into the database:

```bash
npm run seed
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
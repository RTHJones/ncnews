const express = require('express');
const apiRouter = require('./routes/api');
const { routeNotFound, handleSqlError, handleErrors } = require('./errors');

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', routeNotFound);

app.use(handleSqlError)

app.use(handleErrors);

module.exports = app;

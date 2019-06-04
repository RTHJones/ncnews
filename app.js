const express = require('express');
const apiRouter = require('./routes/api');
const { routeNotFound, handleSqlError, handleErrors, handle500 } = require('./errors');

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', routeNotFound);

app.use(handleSqlError);
app.use(handleErrors);
app.use(handle500);

module.exports = app;

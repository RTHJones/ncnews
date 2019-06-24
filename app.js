const express = require('express');
const apiRouter = require('./routes/api');
const cors = require('cors');
const { routeNotFound, handleSqlError, handleErrors, handle500 } = require('./errors');

const app = express();
app.use(cors())

app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', routeNotFound);

app.use(handleSqlError);
app.use(handleErrors);
app.use(handle500);

module.exports = app;

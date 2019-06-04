const errLookup = {
  '22P02': {
    status: 400,
    msg: `User error - input not a valid number. Please enter a valid number.`
  },
  '23503': {
    status: 422,
    msg: 'User input not recognised in database'
  },
  '42703': {
    status: 400,
    msg: 'Sort Criteria Invalid'
  },
  '23502': {
    status: 400,
    msg: 'Bad request - data incomplete'
  }
}

exports.routeNotFound = (req, res) => {
  res.status(404).send('Route Not Found');
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: 'Method Not Allowed' });
};


exports.handleSqlError = (err, req, res, next) => {

  if (errLookup[err.code]) {
    console.log(err, '<-- log from handleSqlError function');
    res
      .status(errLookup[err.code].status)
      .send(errLookup[err.code].msg)
  } else {
    next(err);
  }
}

exports.handleErrors = (err, req, res, next) => {
  let msg422 = 'The data provided is incorrect or incomplete, it can\'t be processed!'
  console.log(err, '<-- log from handleErrors function');
  switch (err.status) {
  case 400: { /* same as case 404 hence no break */ }
    case 404: { res.status(err.status).send(err.msg) };
      break;
    case 422: { res.status(err.status).send(msg422) };
      break;
    default: next(err)
  }
}

exports.handle500 = (err, req, res, next) => {
  console.log(err, '<-- log from handle500 function');
  res
    .status(500)
    .send({ msg: 'Internal Server Error' });
}
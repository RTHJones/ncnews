const errLookup = {
  '22P02': {
    status: 400,
    msg: `User error - input not a valid number. Please enter a valid number.`
  },
  '23503': {
    status: 422,
    msg: 'User input not recognised in database'
  },
  'someothercode': {
    status: 418,
    msg: 'I am not in fact a teapot after all'
  },
  'that last code was a CATastrophe!': {
    status: 999,
    msg: 'call the pun police!'
  }
}




exports.routeNotFound = (req, res) => {
  res.status(404).send('Route Not Found');
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: 'Method Not Allowed' });
};

exports.handleErrors = (err, req, res, next) => {
  console.log(err, '<-- log from handleErrors function');

  if (err.status === 404) {
    res
      .status(err.status)
      .send(err.msg);
  }
  else if (err.status = 422) {
    res
      .status(err.status)
      .send(`The data provided is incorrect or incomplete, it can not be processed!`)
  }

  else if (errLookup[err.code]) {
    res
      .status(errLookup[err.code].status)
      .send(errLookup[err.code].msg)
  }
  else {
    res
      .status(500)
      .send({ msg: 'Internal Server Error' });
  }
}
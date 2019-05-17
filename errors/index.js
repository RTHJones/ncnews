const errLookup = {
  '22P02': {
    status: 400,
    msg: `User error - input not a valid number. Please enter a valid number to access articles.`
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
  res.status(404).send({ msg: 'Route Not Found' });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: 'Method Not Allowed' });
};

exports.handleErrors = (err, req, res, next) => {
  console.log(err, err.code, err.hint);
  if (err.status === 404) {
    res
      .status(err.status)
      .send(err.msg);
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
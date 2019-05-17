exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: 'Route Not Found' });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: 'Method Not Allowed' });
};

exports.handleErrors = (err, req, res, next) => {
  console.log(err, err.code, err.hint);
  if (err.reason === 'username not found') {
    res.status(err.status).send(err.msg);
  }
  else if (err.code === '22P02') {
    res.status(400).send(`User error - input not a valid number. Please enter a valid number`)
  }
  else {
    res.status(500).send({ msg: 'Internal Server Error' });
  }
}
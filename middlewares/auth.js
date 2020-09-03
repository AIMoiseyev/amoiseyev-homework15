const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const errorMessages = require('../errors/err-messages/err-messages');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new UnauthorizedError(errorMessages.authorizationRequired));
  }
  let payload;

  try {
    payload = jwt.verify(token, '6223b09f8bf2c022f1d6266f7ff0b5268892897434e5cb9e15d3a67d1bfdbe4b');
  } catch (err) {
    return next(new UnauthorizedError(errorMessages.authorizationRequired));
  }

  req.user = payload;

  return next();
};

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401)
      .send({ message: 'Необходима авторизация' });
  }
  let payload;

  try {
    payload = jwt.verify(token, '6223b09f8bf2c022f1d6266f7ff0b5268892897434e5cb9e15d3a67d1bfdbe4b');
  } catch (err) {
    return res.status(401)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload;

  return next();
};

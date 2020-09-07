const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const errorMessages = require('../errors/err-messages/err-messages');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');
const NotFoundError = require('../errors/not-found-err');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200)
      .send({ data: users }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(200)
      .send({
        data: {
          _id: user._id,
          name,
          about,
          avatar,
          email,
        },
      }))
    .catch((err) => {
      if (err.name === 'Error') {
        return next(new BadRequestError(errorMessages.requiredFields));
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        return next(new ConflictError(errorMessages.sameEmail));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(errorMessages.fieldValidation));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
        { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      })
        .end();
    })
    .catch(next);
};

module.exports.findUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        return res.status(200)
          .send({ data: user });
      }
      throw new NotFoundError(errorMessages.userId);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(errorMessages.userId));
      }
      return next(err);
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    name,
    about,
  }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => {
      if (user) {
        return res.status(200)
          .send({ data: user });
      }
      throw new NotFoundError(errorMessages.userId);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(errorMessages.fieldValidation));
      }
      return next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    avatar,
  }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((match) => {
      if (match) {
        return res.status(200)
          .send({ data: match });
      }
      throw new NotFoundError(errorMessages.userId);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(errorMessages.fieldValidation));
      }
      return next(err);
    });
};

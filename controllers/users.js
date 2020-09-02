const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200)
      .send({ data: users }))
    .catch(() => res.status(500)
      .send({ message: 'На сервере произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
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
        return res.status(400)
          .send({ message: 'Заполнены не все обязательные поля' });
      }
      if (err.name === 'MongoError') {
        return res.status(409)
          .send({ message: 'Пользователь с таким email уже существует' });
      }
      if (err.name === 'ValidationError') {
        return res.status(400)
          .send({ message: err.message });
      }
      return res.status(500)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, '6223b09f8bf2c022f1d6266f7ff0b5268892897434e5cb9e15d3a67d1bfdbe4b', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      })
        .end();
    })
    .catch((err) => res
      .status(401)
      .send({ message: err.message }));
};

module.exports.findUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        return res.status(200)
          .send({ data: user });
      }
      return res.status(404)
        .send({ message: 'Нет пользователя с таким id' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400)
          .send({ message: 'Нет пользователя с таким id' });
      }
      return res.status(500)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.updateProfile = (req, res) => {
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
      return res.status(404)
        .send({ message: 'Нет пользователя с таким id' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400)
          .send({ message: err.message });
      }
      return res.status(500)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.updateAvatar = (req, res) => {
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
      return res.status(404)
        .send({ message: 'Нет пользователя с таким id' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400)
          .send({ message: err.message });
      }
      return res.status(500)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

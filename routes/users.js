const usersRouter = require('express')
  .Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  getUsers,
  createUser,
  findUser,
  updateProfile,
  updateAvatar,
  login,
} = require('../controllers/users');

const auth = require('../middlewares/auth');

const method = (value, helpers) => {
  if (!validator.isURL(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

usersRouter.post('/signup', celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30),
      about: Joi.string()
        .required()
        .min(2)
        .max(30),
      avatar: Joi.string()
        .required()
        .custom(method, 'custom validation'),
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required()
        .min(8),
    }),
}), createUser);

usersRouter.post('/signin', celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required()
        .min(8),
    }),
}), login);

usersRouter.get('/users', auth, getUsers);

usersRouter.get('/users/:id', auth, celebrate({
  params: Joi.object()
    .keys({
      id: Joi.string()
        .required()
        .hex()
        .length(24),
    }),
}), findUser);

usersRouter.patch('/users/me', auth, celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30),
      about: Joi.string()
        .required()
        .min(2)
        .max(30),
    }),
}), updateProfile);

usersRouter.patch('/users/me/avatar', auth, celebrate({
  body: Joi.object()
    .keys({
      avatar: Joi.string()
        .required()
        .custom(method, 'custom validation'),
    }),
}), updateAvatar);

module.exports = usersRouter;

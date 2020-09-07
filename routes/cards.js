const cardsRouter = require('express')
  .Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const auth = require('../middlewares/auth');

const method = (value, helpers) => {
  if (!validator.isURL(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

cardsRouter.get('/cards', auth, getCards);

cardsRouter.post('/cards', auth, celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30),
      link: Joi.string()
        .required()
        .custom(method, 'custom validation'),
    }),
}), createCard);

cardsRouter.delete('/cards/:cardId', auth, celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string()
        .required()
        .hex()
        .length(24),
    }),
}), deleteCard);

cardsRouter.put('/cards/:cardId/likes', auth, celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string()
        .required()
        .hex()
        .length(24),
    }),
}), likeCard);

cardsRouter.delete('/cards/:cardId/likes', auth, celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string()
        .required()
        .hex()
        .length(24),
    }),
}), dislikeCard);

module.exports = cardsRouter;

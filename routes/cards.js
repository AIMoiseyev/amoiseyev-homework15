const cardsRouter = require('express')
  .Router();
const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const auth = require('../middlewares/auth');

cardsRouter.get('/cards', auth, getCards);
cardsRouter.post('/cards', auth, createCard);
cardsRouter.delete('/cards/:cardId', auth, deleteCard);
cardsRouter.put('/cards/:cardId/likes', auth, likeCard);
cardsRouter.delete('/cards/:cardId/likes', auth, dislikeCard);
module.exports = cardsRouter;

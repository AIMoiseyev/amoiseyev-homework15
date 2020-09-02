const usersRouter = require('express')
  .Router();
const {
  getUsers,
  createUser,
  findUser,
  updateProfile,
  updateAvatar,
  login,
} = require('../controllers/users');

const auth = require('../middlewares/auth');

usersRouter.post('/signup', createUser);
usersRouter.post('/signin', login);
usersRouter.get('/users', auth, getUsers);
usersRouter.get('/users/:id', auth, findUser);
usersRouter.patch('/users/me', auth, updateProfile);
usersRouter.patch('/users/me/avatar', auth, updateAvatar);

module.exports = usersRouter;

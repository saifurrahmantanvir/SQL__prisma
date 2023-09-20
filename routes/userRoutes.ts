import express from 'express';

/* const {
  signup,
  login,
  logout,
  protect,
  isAdmin
} = require('@controllers/authenticationController') */

import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser
} from '@controllers/userController';

/* router.route('/signup').post(signup)
router.route('/login').post(login)

router.route('/logout').get(logout)


router.use(protect, isAdmin) */

const router = express.Router();

router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

export default router;

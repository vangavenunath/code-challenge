import express from 'express'
import * as userController from '../controllers/usersController';
const router = express.Router();

router.post('/', userController.addUser);
router.get('/:id', userController.getUserById);
router.delete('/:id', userController.deleteUserById);

export {router}
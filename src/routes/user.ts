import { Router } from 'express';

import { userController } from '../controllers/user';

const router = Router();

router.route('/users').get(userController.getUsers);

router.route('/user/:id').get(userController.getUser).delete(userController.deleteUser).put(userController.updateUser);

export default router;

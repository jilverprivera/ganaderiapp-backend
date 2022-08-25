import { AdminCheck } from '../middleware/AdminCheck';
import { Router } from 'express';

import { userController } from '../controllers/user';

const router = Router();

router.route('/users').get(AdminCheck, userController.getUsers);

router
  .route('/user/:id')
  .get(AdminCheck, userController.getUser)
  .delete(AdminCheck, userController.deleteUser)
  .put(AdminCheck, userController.updateUser);

router.route('/user_info').get(userController.getUser);

export default router;

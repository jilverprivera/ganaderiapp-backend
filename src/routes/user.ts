import { AdminCheck } from '../middleware/AdminCheck';
import { Router } from 'express';

import { userController } from '../controllers/user';

const router = Router();

router.route('/users').get(AdminCheck, userController.getUsers);

router
  .route('/user/:id')
  .get(AdminCheck, userController.getUser)
  .delete(userController.deleteUser)
  .put(userController.updateUser);

export default router;

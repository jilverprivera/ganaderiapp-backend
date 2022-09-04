import { AdminCheck } from '../middleware/AdminCheck';
import { Router } from 'express';

import { userController } from '../controllers/user';
import { TokenCheck } from '../middleware/TokenCheck';

const router = Router();

router.route('/users').get(TokenCheck, AdminCheck, userController.getUsers);
router.route('/clients').get(TokenCheck, AdminCheck, userController.getClients);

router
  .route('/user/:id')
  .get(TokenCheck, AdminCheck, userController.getSingleUser)
  .delete(TokenCheck, AdminCheck, userController.deleteUser)
  .put(TokenCheck, AdminCheck, userController.updateUser);

router.route('/user_info').get(TokenCheck, userController.getSingleUser);

export default router;

import { authController } from './../controllers/auth';
import { Router } from 'express';

const router = Router();

router.route('/sign_in').post(authController.sign_in);
router.route('/create_user').post(authController.createUser);

export default router;

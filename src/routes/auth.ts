import { Router } from 'express';

import { authController } from './../controllers/auth';

const router = Router();

router.route('/sign_in').post(authController.sign_in);
router.route('/create_user').post(authController.createUser);

export default router;

import { AdminCheck } from '../middleware/AdminCheck';
import { Router } from 'express';

import { userController } from '../controllers/user';

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      properties:
 *        name:
 *          type: string
 *          description: the user name
 *        email:
 *          type: string
 *        password:
 *          type: string
 *      required:
 *        - name
 *        - email
 *        - password
 *      example:
 *        name: test name
 *        email: test@test.com
 *        password: 123456789
 *
 *
 */

/**
 * @swagger
 *  /auth/sign_in:
 *  post:
 *    summary: create new user
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json
 *      schema:
 *        type: object
 *        $ref: '#/components/schemas/User'
 *    responses:
 *      201:
 *        description: new user has created.
 *
 *
 */

router.route('/users').get(AdminCheck, userController.getUsers);

router
  .route('/user/:id')
  .get(AdminCheck, userController.getUser)
  .delete(AdminCheck, userController.deleteUser)
  .put(AdminCheck, userController.updateUser);

router.route('/user_info').get(userController.getUser);

export default router;

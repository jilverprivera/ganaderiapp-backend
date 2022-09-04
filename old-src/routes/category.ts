import { Router } from 'express';
import { AdminCheck } from '../middleware/AdminCheck';

import { categoryController } from './../controllers/category';

const router = Router();

router.route('/categories').get(categoryController.getCategories);
router.route('/create_category').post(AdminCheck, categoryController.createCategory);
router
  .route('/category/:id')
  .get(categoryController.getSingleCategory)
  .put(AdminCheck, categoryController.updateCategory);

export default router;

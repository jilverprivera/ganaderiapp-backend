import { Router } from 'express';

import { animalController } from '../controllers/animal';

import { AdminCheck } from '../middleware/AdminCheck';
import { PersonalTokenCheck } from '../middleware/PersonalTokenCheck';
import { TokenCheck } from '../middleware/TokenCheck';

const router = Router();

router.route('/animals').get(TokenCheck, AdminCheck, animalController.getAnimals);
router.route('/animals/:id').get(TokenCheck, PersonalTokenCheck, animalController.getAnimals);
router.route('/animals/:id/:category_id').get(TokenCheck, PersonalTokenCheck, animalController.getAnimalsByCategory);
router.route('/create_animal/:id').post(TokenCheck, PersonalTokenCheck, animalController.createAnimal);

export default router;

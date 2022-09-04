import express from 'express';
import { imageController } from '../controllers/image';

const router = express.Router();

router.route('/upload-animal').post(imageController.uploadAnimalImage);
router.route('/upload-person').post(imageController.uploadPersonImage);

export default router;

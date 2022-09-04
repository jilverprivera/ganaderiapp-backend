import { Router } from 'express';

import { PersonCase } from '../../application/personCase';
import { PersonController } from '../controller/person.controller';
import { PgRepository } from '../repository/pg.repository';

const router = Router();

const personRepo = new PgRepository();
const personCase = new PersonCase(personRepo);
const personController = new PersonController(personCase);

router.route('/persons').get(personController.listPersons);
router.route('/person/:id').get(personController.findPersonByID);
router.route('/person').post(personController.createPerson);

export default router;

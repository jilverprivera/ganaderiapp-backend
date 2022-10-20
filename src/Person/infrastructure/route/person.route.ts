import { Router } from 'express';

import { PersonCase } from '../../application/personCase';
import { PersonController } from '../controller/person.controller';
import { PgRepository } from '../repository/pg.repository';

const router = Router();

const personRepo = new PgRepository();
const personCase = new PersonCase(personRepo);
const personController = new PersonController(personCase);

router.route('/persons').get(personController.getPersons);
router.route('/person').post(personController.createPerson);
router.route('/person/auth').post(personController.authenticatePerson);
router.route('/person/:id').get(personController.findPersonByID).delete(personController.removePerson);

router.route('/person/upload/:id').put(personController.updatePersonImage);
router.route('/person/destroy/:id').put(personController.removePersonImage);

export default router;

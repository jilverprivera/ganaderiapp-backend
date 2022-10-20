import { PersonEntity } from '../Person/domain/person.entity';

export {};

declare global {
  namespace Express {
    interface Request {
      user: PersonEntity;
    }
  }
}

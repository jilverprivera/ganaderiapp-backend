import { PersonEntity } from './person.entity';

export interface PersonRepository {
  createPerson(person: PersonEntity): Promise<PersonEntity | null>;
  listPersons(): Promise<PersonEntity[] | null>; // ✅
  findPersonByID(id: number): Promise<PersonEntity | null>;
  // updatePersonImage({ image_url, image_public_id }): Promise<PersonEntity | null>;
  // removePerson(): Promise<void | null>;
}

import { PersonEntity } from './person.entity';

export interface PersonRepository {
  getPersons(): Promise<PersonEntity[] | null>; // ✅
  findPersonByID(id: number): Promise<PersonEntity | null>; // ✅
  createPerson(person: PersonEntity): Promise<PersonEntity | null>; // ✅
  // updatePerson(person: PersonEntity): Promise<PersonEntity | null>;
  removePerson(id: number): Promise<void | null>; // ✅
  updatePersonImage(image_url: string, image_public_id: string, id: number): Promise<PersonEntity | null>; // ✅
  removePersonImage(id: number): Promise<void | null>; // ✅|
  authenticatePerson(email: string, password: string): Promise<PersonEntity | null>; // ✅
}

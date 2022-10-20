import pool from '../../../db/pool';

import { PersonEntity } from '../../domain/person.entity';
import { PersonRepository } from '../../domain/person.repository';

export class PgRepository implements PersonRepository {
  async getPersons(): Promise<PersonEntity[] | any> {
    const persons = (await pool.query('SELECT * FROM person')).rows;
    return persons;
  }

  async findPersonByID(id: number): Promise<PersonEntity | null> {
    const person = (await pool.query('SELECT * FROM person WHERE id = $1', [id])).rows[0];
    return person;
  }

  async createPerson(person: PersonEntity): Promise<PersonEntity | any> {
    const { name, email, password, image_url, image_public_id } = person;
    await pool.query(
      'INSERT INTO person(name, email, password, image_url, image_public_id) VALUES ($1 , $2, $3, $4, $5) ',
      [name, email, password, image_url, image_public_id]
    );
    return person;
  }

  async removePerson(id: number): Promise<PersonEntity | any> {
    await pool.query('DELETE FROM person WHERE id = $1', [id]);
    return id;
  }

  async updatePersonImage(image_url: string, image_public_id: string, id: number): Promise<PersonEntity | any> {
    const valuesToUpdate = { image_url, image_public_id };
    await pool.query('UPDATE person SET image_url = $1, image_public_id = $2 WHERE id = $3', [
      image_url,
      image_public_id,
      id,
    ]);
    return valuesToUpdate;
  }

  async removePersonImage(id: number): Promise<void | any> {
    const valuesToUpdate = [
      'http://res.cloudinary.com/jilver-cloud/image/upload/v1662328239/ganaderiapp/person/vqfvovbhbt80el9jkmki.png',
      'ganaderiapp/person/vqfvovbhbt80el9jkmki',
      id,
    ];
    await pool.query('UPDATE person SET image_url = $1, image_public_id = $2 WHERE id = $3', valuesToUpdate);
    return valuesToUpdate;
  }

  async authenticatePerson(email: string): Promise<PersonEntity | any> {
    const checkingPerson = (await pool.query('SELECT * FROM person WHERE email = $1', [email])).rows[0];
    return checkingPerson;
  }
}

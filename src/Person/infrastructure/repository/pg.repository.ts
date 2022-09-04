import pool from '../../../db/pool';

import { PersonEntity } from 'Person/domain/person.entity';
import { PersonRepository } from 'Person/domain/person.repository';

export class PgRepository implements PersonRepository {
  async listPersons(): Promise<PersonEntity[] | any> {
    const persons = (await pool.query('SELECT * FROM person')).rows;
    return persons;
  }
  async findPersonByID(id: number): Promise<PersonEntity | null> {
    const person = (await pool.query('SELECT * FROM person WHERE id = $1', [id])).rows[0];
    return person;
  }
  async createPerson(person: PersonEntity): Promise<PersonEntity | any> {
    const { name, email, password } = person;
    await pool.query('INSERT INTO person(name, email, password) VALUES ($1 , $2, $3) ', [name, email, password]);
    return person;
  }
}

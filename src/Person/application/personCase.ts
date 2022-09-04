import { PersonValue } from '../domain/person.value';
import { PersonRepository } from '../domain/person.repository';
import { PersonEntity } from '../domain/person.entity';

export class PersonCase {
  constructor(private readonly PersonRepository: PersonRepository) {}

  public async createPerson({ name, email, password }: PersonEntity) {
    const newPerson = new PersonValue({ name, email, password });
    const personCreated = await this.PersonRepository.createPerson(newPerson);
    return personCreated;
  }

  public async listPersons() {
    const persons = await this.PersonRepository.listPersons();
    return persons;
  }
  public async findPersonByID(id: number) {
    const persons = await this.PersonRepository.findPersonByID(Number(id));
    return persons;
  }
}

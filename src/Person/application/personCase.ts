import { PersonValue } from '../domain/person.value';
import { PersonRepository } from '../domain/person.repository';
import { PersonEntity } from '../domain/person.entity';

export class PersonCase {
  constructor(private readonly PersonRepository: PersonRepository) {}

  public async getPersons() {
    const persons = await this.PersonRepository.getPersons();
    return persons;
  }

  public async findPersonByID(id: number) {
    const persons = await this.PersonRepository.findPersonByID(Number(id));
    return persons;
  }

  public async createPerson({ name, email, password }: PersonEntity) {
    const newPerson = new PersonValue({ name, email, password });
    const personCreated = await this.PersonRepository.createPerson(newPerson);
    return personCreated;
  }

  public async removePerson(id: number) {
    const personDeleted = await this.PersonRepository.removePerson(Number(id));
    return personDeleted;
  }

  public async updatePersonImage(image_url: string, image_public_id: string, id: number) {
    const personUpdated = await this.PersonRepository.updatePersonImage(image_url, image_public_id, Number(id));
    return personUpdated;
  }

  public async removePersonImage(id: number) {
    const removedImage = await this.PersonRepository.removePersonImage(Number(id));
    return removedImage;
  }

  public async authenticatePerson(email: string, password: string) {
    const authPerson = await this.PersonRepository.authenticatePerson(email, password);
    return authPerson;
  }
}

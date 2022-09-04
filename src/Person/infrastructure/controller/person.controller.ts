import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { PersonEntity } from 'Person/domain/person.entity';
import { PersonCase } from 'Person/application/personCase';

export class PersonController {
  constructor(private PersonCase: PersonCase) {
    this.createPerson = this.createPerson.bind(this);
    this.listPersons = this.listPersons.bind(this);
    this.findPersonByID = this.findPersonByID.bind(this);
  }

  public async listPersons(_req: Request, res: Response) {
    const persons = await this.PersonCase.listPersons();
    res.status(200).json(persons);
  }

  public async findPersonByID(req: Request, res: Response) {
    const { id } = req.params;
    const person = await this.PersonCase.findPersonByID(Number(id));
    res.status(200).json(person);
  }

  public async createPerson({ body }: Request, res: Response) {
    const { name, email, password }: PersonEntity = body;
    if (email === undefined || name === undefined || password === undefined) {
      res.status(400).json({ statusCode: 'Bad Request', message: 'Please fill all the fields.' });
    }
    const passwordEncrypted = await bcrypt.hash(password, 10);
    const newBody = { name, email, password: passwordEncrypted };
    const person = await this.PersonCase.createPerson(newBody);
    res.status(201).json({ statusCode: 'Created.', person });
  }
}

import { PersonEntity } from './../../domain/person.entity';
import { Request, Response } from 'express';
import { v2 } from 'cloudinary';
import bcrypt from 'bcrypt';

import { PersonCase } from '../../application/personCase';

import { cloudinaryConfig, removeTmpFiles } from '../../../helpers/cloudinary';
import { generateJWT } from '../../../helpers/generateJWT';

import { File, ImageType } from '../../../types/Image';

v2.config(cloudinaryConfig);
export class PersonController {
  constructor(private PersonCase: PersonCase) {
    this.getPersons = this.getPersons.bind(this);
    this.findPersonByID = this.findPersonByID.bind(this);
    this.createPerson = this.createPerson.bind(this);
    this.updatePersonImage = this.updatePersonImage.bind(this);
    this.removePersonImage = this.removePersonImage.bind(this);
    this.removePerson = this.removePerson.bind(this);
    this.authenticatePerson = this.authenticatePerson.bind(this);
  }

  public async getPersons(_req: Request, res: Response) {
    const persons = await this.PersonCase.getPersons();
    res.status(200).json(persons);
  }

  public async findPersonByID({ params }: Request, res: Response) {
    const { id } = params;
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

  public async removePerson({ params }: Request, res: Response) {
    const { id } = params;
    await this.PersonCase.removePerson(Number(id));
    res.status(200).json({ statusCode: 'Ok' });
  }

  public async updatePersonImage({ params, files }: Request, res: Response) {
    const { id } = params;
    try {
      if (!files || Object.keys(files).length === 0) {
        return res.status(400).json({ statusCode: 'Bad Request.', message: 'No user image selected.' });
      }
      const { file }: any = files;
      const { tempFilePath, size, mimetype }: File = file;
      if (size > 1024 * 1024) {
        removeTmpFiles(tempFilePath);
        return res.status(400).json({ statusCode: 'Bad Request.', message: 'Image size is too large.' });
      }
      if (
        mimetype !== ImageType.JPEG &&
        mimetype !== ImageType.JPG &&
        mimetype !== ImageType.PNG &&
        mimetype !== ImageType.WEBP
      ) {
        removeTmpFiles(tempFilePath);
        return res.status(400).json({ statusCode: 'Bad Request.', message: 'Incorrect image format' });
      }
      const result = await v2.uploader.upload(tempFilePath, { folder: 'ganaderiapp/person' }, (err, result) => {
        if (err) throw err;
        removeTmpFiles(tempFilePath);
        return result;
      });
      const imageUpdated = await this.PersonCase.updatePersonImage(result.url, result.public_id, Number(id));
      return res.status(200).json({ statusCode: 'OK', result: imageUpdated });
    } catch (err) {
      throw err;
    }
  }

  public async removePersonImage({ body, params }: Request, res: Response) {
    const { id } = params;
    const { image_public_id } = body;
    console.log(id);
    try {
      if (!image_public_id) {
        return res.status(400).json({ statusCode: 'Bad Request.', message: 'No image public Id selected.' });
      }
      await v2.uploader.destroy(image_public_id, async (err: any) => {
        if (err) throw err;
      });
      await this.PersonCase.removePersonImage(Number(id));
      return res.status(200).json({ statusCode: 'OK', message: 'The image has been restored to its default values.' });
    } catch (err) {
      return res.status(500).json({ message: 'Error on DB, call an administrator.' });
    }
  }

  public async authenticatePerson({ body }: Request, res: Response) {
    const { email, password }: PersonEntity = body;
    if (!email) {
      return res.status(400).json({ statusCode: 'Bad Request.', message: 'Email is required.' });
    }
    const person = await this.PersonCase.authenticatePerson(email, password);
    if (!person?.email) {
      return res.status(400).json({ statusCode: 'Bad Request', message: 'User not found.' });
    }
    const passwordMatch = await bcrypt.compare(password, person.password);
    if (!passwordMatch) {
      return res.status(400).json({ statusCode: 'Bad Request', message: "Email or password aren't correct." });
    }
    const token = await generateJWT(String(person.id));
    return res.status(200).json({ statusCode: 'Ok', person, token });
  }
}

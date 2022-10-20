import { PersonEntity } from './person.entity';

export class PersonValue implements PersonEntity {
  id?: number;
  name: string;
  email: string;
  password: string;
  image_url: string;
  image_public_id: string;
  role: number;
  constructor({ id, name, email, password, image_url, image_public_id }: PersonEntity) {
    this.id = id ?? 0;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = 0;
    this.image_public_id = image_public_id ?? 'ganaderiapp/person/vqfvovbhbt80el9jkmki';
    this.image_url =
      image_url ??
      'http://res.cloudinary.com/jilver-cloud/image/upload/v1662328239/ganaderiapp/person/vqfvovbhbt80el9jkmki.png';
  }
}

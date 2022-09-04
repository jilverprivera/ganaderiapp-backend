import path from 'path';

import auth from './paths/auth';
import users from './paths/user';

import userSchema from './schemas/userSchema';
import categorySchema from './schemas/categorySchema';
import animalSchema from './schemas/animalSchema';

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GanaderiApp API',
      version: '1.0.0',
      description:
        'GanaderiApp is a personal project that allow to keep the control  of the animals that a person owns in his farm. ',
    },

    servers: [
      {
        url: 'https://backend-ganaderiapp.herokuapp.com',
        description: 'Server (Production) - PaaS Working until 28 Nov 2022😢. ',
      },
      {
        url: 'https://ganaderiapp.onrender.com',
        description: 'Server (Backup) - PaaS Oregon (US West).',
      },
    ],

    paths: {
      ...auth,
      ...users,
    },

    components: {
      schemas: {
        ...userSchema,
        ...animalSchema,
        ...categorySchema,
      },
    },
  },

  apis: [`${path.join(__dirname, './routes/*.ts')}`], // files containing annotations as above
};

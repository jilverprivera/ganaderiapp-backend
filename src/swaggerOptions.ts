import path from 'path';

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GanaderiApp API',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'https://backend-ganaderiapp.herokuapp.com',
      },
    ],
  },
  apis: [`${path.join(__dirname, './routes/*.ts')}`], // files containing annotations as above
};

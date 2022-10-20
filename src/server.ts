import express from 'express';
import * as http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

import personRoute from './Person/infrastructure/route/person.route';

import { swaggerOptions } from './doc/swagger';

export class Server {
  private express: express.Express;
  private port: string;
  private httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.express = express();
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(morgan('dev'));
    this.express.use(cookieParser());
    this.express.use(fileUpload({ useTempFiles: true }));

    this.express.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));

    this.express.use('/api', personRoute);
  }

  async listen(): Promise<void> {
    return new Promise((resolve) => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(`Backend App running at http://localhost:${this.port} in ${this.express.get('env')} mode.`);
        resolve();
      });
    });
  }

  getHTTPServer() {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }
      return resolve();
    });
  }
}

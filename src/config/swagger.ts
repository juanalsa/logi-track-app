import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { envs } from './envs';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentación de la API con Swagger y TypeScript',
    },
    servers: [
      {
        url: `http://localhost:${envs.PORT}`,
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./src/presentation/controllers/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(
    `📄 Swagger Docs disponibles en http://localhost:${envs.PORT}/api-docs`,
  );
}

import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Readlog API',
      version: '1.0.0',
      description: 'API documentation for the Readlog app',
    },
    servers: [
      {
        url: 'http://localhost:8080'
      },
    ],
  },
  apis: ['./src/modules/**/routes.ts'],
});

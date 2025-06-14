// swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import apiDocs from './swagger-docs/index.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BookRent API',
      version: '1.0.0',
      description: 'API documentation for Book Rental system',
    },
    servers: [
      {
        url: 'https://book-rental-system-api.vercel.app', 
      },
    ],
  },
  apis: apiDocs,
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };

import express from 'express';
import db from './models/index.js'; 
import dotenv from 'dotenv';
import routes from './routes.js';
import { swaggerUi, swaggerSpec } from './swagger.js';

dotenv.config();

const app = express();

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

import cors from 'cors';
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { customCssUrl: CSS_URL }));
app.get('/', (req, res) => {
  console.log('📥 Received request on root route (/)');
  res.send('📚 Book Rental API is running');
});


app.use(cors());
app.use(express.json()); 
app.use(routes);



db.sequelize.authenticate()
  .then(() => {
    console.log('✅ Connected to SQL database.');
    return db.sequelize.sync();
  })
  .catch((error) => {
    console.error('❌ Failed to connect to the SQL database:', error);
  });


export default app;
import express from 'express';
import bodyParser from 'body-parser';
import db from './models/index.js'; 
import dotenv from 'dotenv';
import routes from './routes.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(routes);

const PORT = process.env.PORT || 3000;

db.sequelize.authenticate()
  .then(() => {
    console.log('✅ Connected to SQL database.');
    return db.sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Failed to connect to the SQL database:', error);
  });

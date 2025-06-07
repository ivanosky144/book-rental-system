import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 
import userModel from "../model/user.js";
import authorModel from "../model/author.js";
import bookModel from "../model/book.js";
import bookCopyModel from "../model/book_copy.js";
import genreModel from "../model/genre.js";
import paymentModel from "../model/payment.js";
import publisherModel from "../model/publisher.js";
import rentalModel from "../model/rental.js";
import reservationModel from "../model/reservation.js";
import adminModel from '../model/admin.js';
import bookGenreModel from '../model/book_genre.js';
import bookAuthorModel from '../model/book_author.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const db = {};

const files = fs.readdirSync(__dirname).filter(file =>
  file !== basename && file.endsWith('.js')
);

for (const file of files) {
  const { default: modelFn } = await import(path.join(__dirname, file));
  const model = modelFn(sequelize, DataTypes);
  db[model.name] = model;
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = DataTypes;
db.User = userModel(sequelize, DataTypes);
db.Author = authorModel(sequelize, DataTypes);
db.Book = bookModel(sequelize, DataTypes);
db.BookCopy = bookCopyModel(sequelize, DataTypes);
db.Genre = genreModel(sequelize, DataTypes);
db.Payment = paymentModel(sequelize, DataTypes);
db.Publisher = publisherModel(sequelize, DataTypes);
db.Rental = rentalModel(sequelize, DataTypes);
db.Reservation = reservationModel(sequelize, DataTypes);
db.Admin = adminModel(sequelize, DataTypes);
db.BookGenre = bookGenreModel(sequelize, DataTypes);
db.BookAuthor = bookAuthorModel(sequelize, DataTypes);

export default db;

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    CREATE TABLE IF NOT EXISTS "book_genres" (
      book_id INTEGER NOT NULL,
      genre_id INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_book FOREIGN KEY (book_id)
      REFERENCES books(id) ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT fk_genre FOREIGN KEY (genre_id)
      REFERENCES genres(id) ON DELETE CASCADE ON UPDATE CASCADE
    );
  `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS "book_genres";
  `);
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    CREATE TABLE IF NOT EXISTS "book_authors" (
      book_id INTEGER NOT NULL,
      author_id INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_book FOREIGN KEY (book_id)
      REFERENCES books(id) ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT fk_genre FOREIGN KEY (author_id)
      REFERENCES authors(id) ON DELETE CASCADE ON UPDATE CASCADE
    );
  `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS "book_authors";
  `);
  }
};

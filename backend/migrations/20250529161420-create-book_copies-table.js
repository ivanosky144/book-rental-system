'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE TYPE status AS ENUM('available', 'checked_out', 'reserved');
      CREATE TABLE IF NOT EXISTS "books" (
        id SERIAL PRIMARY KEY,
        book_id INTEGER NOT NULL,
        status status NOT NULL,
        location VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_book FOREIGN KEY (book_id)
          REFERENCES books(id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS "book_copies";
  `);
  }
};

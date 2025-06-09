'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS "books" (
        id SERIAL PRIMARY KEY,
        publisher_id INTEGER NOT NULL,
        title VARCHAR(255) NOT NULL,
        publication_year CHAR(4) NOT NULL,
        isbn VARCHAR(25) NOT NULL,
        summary TEXT NOT NULL,
        cover_image_url VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_publisher FOREIGN KEY (publisher_id)
          REFERENCES publishers(id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS "books";
    `);
  }
};

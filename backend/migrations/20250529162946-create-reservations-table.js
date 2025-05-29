'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    CREATE TYPE reservation_status AS ENUM ('pending', 'confirmed', 'cancelled');
    CREATE TABLE IF NOT EXISTS "reservations" (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      book_id INTEGER NOT NULL,
      reservation_date DATE NOT NULL,
      status reservation_status,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_user FOREIGN KEY (user_id)
      REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT fk_book FOREIGN KEY (book_id)
      REFERENCES books(id) ON DELETE CASCADE ON UPDATE CASCADE
    );
  `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS "reservations";
  `);
  }
};

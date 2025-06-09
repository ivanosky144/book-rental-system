'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE TYPE rental_status AS ENUM('active', 'completed', 'overdue');
      CREATE TABLE IF NOT EXISTS "rentals" (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        book_copy_id INTEGER NOT NULL,
        rental_date DATE NOT NULL,
        due_date DATE NOT NULL,
        return_date DATE NOT NULL,
        status rental_status NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
  `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS "rentals";
  `);
  }
};

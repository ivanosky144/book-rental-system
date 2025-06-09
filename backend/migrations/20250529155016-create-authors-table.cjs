'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.sequelize.query(`
        CREATE TABLE IF NOT EXISTS "authors" (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          bio VARCHAR(255) NOT NULL,
          nationality VARCHAR(50) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS "authors";
    `);
  }
};

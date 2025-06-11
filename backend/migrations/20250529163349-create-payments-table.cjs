'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    CREATE TYPE method AS ENUM ('cash', 'credit_card', 'debit_card', 'e_wallet');
    CREATE TABLE IF NOT EXISTS "payments" (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      rental_id INTEGER NOT NULL,
      amount INTEGER NOT NULL,
      method method NOT NULL,
      payment_date DATE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_user FOREIGN KEY (user_id)
      REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT fk_rental FOREIGN KEY (rental_id)
      REFERENCES rentals(id) ON DELETE CASCADE ON UPDATE CASCADE
    );
  `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS "reservations";
  `);
  }
};

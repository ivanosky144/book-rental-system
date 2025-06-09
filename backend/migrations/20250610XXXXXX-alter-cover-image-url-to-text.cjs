// Migration: Alter cover_image_url column in books table to TEXT
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('books', 'cover_image_url', {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('books', 'cover_image_url', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};

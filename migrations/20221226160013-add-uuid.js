'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Messages', 'uuid', {
      type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4
    })
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Messages', 'uuid')
  }
}

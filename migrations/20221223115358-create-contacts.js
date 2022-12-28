'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.createTable('Contacts', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                contactUserId: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                userId: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
            }, {transaction})

            await queryInterface.addColumn('Chats', 'createdAt',
                {
                    type: Sequelize.DATE
                }, {transaction})

            await queryInterface.addColumn('Chats', 'updatedAt',
                {
                    type: Sequelize.DATE
                }, {transaction})

            await queryInterface.addColumn('UserChats', 'createdAt',
                {
                    type: Sequelize.DATE
                }, {transaction})

            await queryInterface.addColumn('UserChats', 'updatedAt',
                {
                    type: Sequelize.DATE
                }, {transaction})
            // await queryInterface.addColumn('UserChats', 'isDeleted', {
            //     type: Sequelize.BOOLEAN,
            //     defaultValue: false,
            // }, {transaction})
            await transaction.commit();

        } catch (err) {
            await transaction.rollback();
            throw err
        }
    },

    async down(queryInterface) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.dropTable('Contacts')
            await queryInterface.removeColumn('Chats', 'createdAt')
            await queryInterface.removeColumn('Chats', 'updatedAt')
            await queryInterface.removeColumn('UserChats', 'createdAt')
            await queryInterface.removeColumn('UserChats', 'updatedAt')
            // await queryInterface.removeColumn('UserChats', 'isDeleted')

            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
};


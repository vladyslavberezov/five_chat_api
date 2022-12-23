'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.DataTypes.INTEGER
        },
        firstName: { type: Sequelize.DataTypes.STRING },
        nickname: { type: Sequelize.DataTypes.STRING },
        lastName: { type: Sequelize.DataTypes.STRING },
        email: { type: Sequelize.DataTypes.STRING, unique: true },
        password: { type: Sequelize.DataTypes.STRING },
        lastOnline: Sequelize.DataTypes.DATE,
        createdAt: Sequelize.DataTypes.DATE,
        updatedAt: Sequelize.DataTypes.DATE
      }, { transaction });

      await queryInterface.createTable('Chats', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false
        },
        isGroup: {
          type: Sequelize.BOOLEAN
        }
      }, { transaction });

      await queryInterface.createTable('UserChats', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        chatId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Chats',
            key: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }

      }, { transaction });

      await queryInterface.createTable('Messages', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        userChatId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'UserChats',
            key: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        text: {
          type: Sequelize.STRING
        },
        isRead: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        authorId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        }
      }, { transaction });


      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  down: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('Users', { transaction });
      await queryInterface.dropTable('Chats', { transaction });
      await queryInterface.dropTable('UserChats', { transaction });
      await queryInterface.dropTable('Messages', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
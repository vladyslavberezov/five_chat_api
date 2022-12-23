const { MODELS } = require('../lib/db')

module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    MODELS.Messages,
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userChatId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      uuid: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: true,
    },
  )

  model.associate = function (models) {
    models.Messages.belongsTo(models.UserChats, { foreignKey: 'userChatId' })
  }

  return model
}

const { MODELS } = require('../lib/db')

module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    MODELS.UserChats,
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      chatId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

    },
  )


  model.associate = function (models) {
    models.UserChats.belongsTo(models.User, { foreignKey: 'userId' })
    models.UserChats.hasMany(models.Messages, { foreignKey: 'userChatId' })
    models.UserChats.belongsTo(models.Chats, { foreignKey: 'chatId', as: 'participants' })
  }

  return model
}

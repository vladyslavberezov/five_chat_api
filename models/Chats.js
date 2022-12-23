const { MODELS } = require('../lib/db/')

module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    MODELS.Chats,
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isGroup: {
        type: DataTypes.BOOLEAN,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'Chats',
      timestamps: true,
    },
  )
  model.associate = function (models) {
    models.Chats.hasMany(models.UserChats, { foreignKey: 'chatId' })
  }
  return model
}

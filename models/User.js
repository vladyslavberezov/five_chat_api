const { MODELS } = require('../lib/db')
module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    MODELS.User,
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      firstName: { type: DataTypes.STRING },
      nickname: { type: DataTypes.STRING },
      lastName: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING, unique: true },
      password: { type: DataTypes.STRING },
      lastOnline: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'Users',
      timestamps: true,
    },
  )

  model.associate = function (models) {
    models.User.hasMany(models.Contacts, { foreignKey: 'userId' })
    models.User.hasMany(models.Contacts, { foreignKey: 'contactUserId' })

    models.User.hasMany(models.UserChats, { foreignKey: 'userId' })
  }
  return model
}

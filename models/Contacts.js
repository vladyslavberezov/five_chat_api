const { MODELS } = require('../lib/db')
module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    MODELS.Contacts,
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      contactUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'Contacts',
      timestamps: false,
    },
  )
  model.associate = function (models) {
    models.Contacts.belongsTo(models.User, { foreignKey: 'userId' })
    models.Contacts.belongsTo(models.User, { foreignKey: 'contactUserId' })
  }
  return model
}

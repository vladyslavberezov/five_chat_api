const { MODELS } = require('../lib/db')

module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    MODELS.RefreshSession,
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      ua: DataTypes.STRING,
      ip: DataTypes.STRING,
      fingerprint: DataTypes.STRING,
      refreshToken: DataTypes.STRING,
      expiresIn: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'RefreshSessions',
      timestamps: true,
    },
  )
  return model
}

const path = require('path')
const { Sequelize, DataTypes } = require('sequelize')
const env = require('../env')
const { MODELS } = require('./types')

const sequelize = new Sequelize(
  env.DB_NAME,
  env.DB_USER_ENTRY,
  env.DB_PASSWORD,
  {
    host: env.HOST,
    port: env.DB_PORT,
    dialect: env.DIALECT,
    timezone: '+00:00',
  },
)

const db = {}

async function initModels() {
  // importing all models to the db constant
  Object.values(MODELS).forEach((model) => {
    const defineModel = require(path.join(process.cwd(), 'models', `${model}.js`))
    db[model] = defineModel(sequelize, DataTypes)
  })

  // calling association function for models
  Object.values(MODELS).forEach((model) => {
    if (db[model].associate) {
      db[model].associate(db)
    }
  })
}

async function initDb() {
  await sequelize.authenticate()
  // await sequelize.sync()
  await initModels()
}

module.exports = {
  sequelize,
  initDb,
  db,
  MODELS,
}


require('dotenv').config()
const { keyblade } = require('keyblade')
const env = keyblade(process.env)

module.exports = env
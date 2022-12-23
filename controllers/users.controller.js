const { handleError } = require('../lib/utils/')
const { UsersDAO } = require('../dao/')
const { ChatDAO } = require('../dao')

const getUserById = handleError(async (req, res) => {
  const data = await UsersDAO.getUserById(req.params.id)
  res.send({ data })
})

const getAllUsers = handleError(async (req, res) => {
  const data = await UsersDAO.getAllUsers()
  res.send({ data })
})

const saveUser = handleError(async (req, res) => {
  const data = await UsersDAO.saveUser(req.body)
  res.send({ data })
})

const deleteUser = handleError(async (req, res) => {
  const data = await UsersDAO.deleteUser(req.params.id)
  res.send(data)
})

const getAllChats = handleError(async (req, res) => {
  const data = await ChatDAO.getAllChats(req.params.id)
  res.send({ data })
})
const getMe = handleError(async (req, res) => {
  const data = await UsersDAO.getUserById(req.user.id)
  res.send({ data })
})


module.exports = {
  getAllUsers,
  getUserById,
  saveUser,
  deleteUser,
  getAllChats,
  getMe
}

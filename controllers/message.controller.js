const { MessagesDAO } = require('../dao/')
const { handleError } = require('../lib/utils/')

const getMessages = handleError(async (req, res) => {
  const { id } = req.params
  const { user } = req.state
  const data = await MessagesDAO.getMessages(id, user.id)
  res.send({ data })
})

const saveMessage = handleError(async (req, res) => {
  await MessagesDAO.saveMessage(req.body)
  res.send('saved')
})

const deleteMessage = handleError(async (req, res) => {
  const data = await MessagesDAO.deleteMessage(req.params.id)
  if (data) {
    res.send('Message was delete')
  } else {
    res.send('smth wrong')
  }
})
const changeMessage = handleError(async (req, res) => {
  const data = await MessagesDAO.changeMessage(req.body)
  res.send({ data })
})


module.exports = {
  getMessages,
  saveMessage,
  deleteMessage,
  changeMessage,
}

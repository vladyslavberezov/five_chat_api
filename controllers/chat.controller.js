const { handleError } = require('../lib/utils')
const { InternalServerError, ConflictError, ForbiddenError } = require('../lib/errors')
const { ChatDAO, ContactsDAO } = require('../dao/')
const { getChat } = require('../dao/Chat.DAO')
const { MessagesDAO } = require('../dao')

const createChat = handleError(async (req, res, next) => {
  const contacts = await ContactsDAO.getUserContacts(req.user.id)
  if (!contacts) {
    next(new ConflictError('Contacts not found'))
    return
  }

  const contactIds = contacts.map(contact => (contact.get({ plain: true })).contactUserId)
  const { users } = req.body

  for (let i = 0; i < users.length; i += 1) {
    const userId = users[i]
    if (!contactIds.some((contactId) => contactId === parseInt(userId))) {
      next(new ConflictError('User must be in your contacts'))
      return
    }
  }

  const chat = await ChatDAO.createChat(req.body, req.user)
  if (!chat?.id) {
    next(new InternalServerError('Unable to create chat'))
    return
  }
  res.send(chat)
})

const updateChat = handleError(async (req, res) => {
  const data = await ChatDAO.updateChat(req.body)
  res.send({ data })
})


const deleteChat = handleError(async (req, res, next) => {
  try {
    const { id } = req.params
    const { forAll } = req.query
    const chat = await getChat(id)
    const userChat = chat.UserChats.find((userChat) => userChat.userId === req.user.id)

    if (!userChat) {
      next(new ForbiddenError('You must be a chat participant'))
    }

    if (forAll === 'true') {
      const chatDeletedId = await ChatDAO.deleteChat(id)
      res.send({ data: { id: chatDeletedId } })
    } else {
      await MessagesDAO.deleteUserMessages(userChat.id)
      await ChatDAO.updateUserChat(userChat.id, { isDeleted: true })
      res.send({ data: { id } })
    }
  } catch (e) {
    next(e)
  }
})

module.exports = {
  deleteChat,
  createChat,
  updateChat,
}

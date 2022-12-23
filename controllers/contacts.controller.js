const { ContactsDAO } = require('../dao/')
const { handleError } = require('../lib/utils/')
const { ForbiddenError, BadRequestError } = require('../lib/errors')

const getUserContacts = handleError(async (req, res) => {
  const { id } = req.params
  const data = await ContactsDAO.getUserContacts(id)
  res.send({ data })
})

const addContact = handleError(async (req, res, next) => {
  try {
    if (parseInt(req.params.id) !== req.user.id) {
      next(new ForbiddenError('Not allowed'))
      return
    }
    if (parseInt(req.params.id) === parseInt(req.body.contactUserId)) {
      next(new BadRequestError('Hey body!'))
      return
    }

    const data = await ContactsDAO.addContact(req.params.id, req.body.contactUserId)
    res.send({ data })
  } catch (e) {
    next(e)
  }
})

const deleteContact = handleError(async (req, res) => {
  await ContactsDAO.deleteContact(req.params.id)
  res.send('Contact was deleted')
})


module.exports = {
  addContact,
  deleteContact,
  getUserContacts,
}

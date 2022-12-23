const express = require('express')
const router = express.Router()
const { auth } = require('../middleware')
const {
  getUserById,
  getAllUsers,
  saveUser,
  deleteUser,
  getAllChats,
  getMe
} = require('../controllers/users.controller')
const {
  addContact,
  deleteContact,
  getUserContacts,
} = require('../controllers/contacts.controller')


router.get('/', auth, getAllUsers)
router.post('/', saveUser)
router.get('/me', auth, getMe)
router.delete('/:id', auth, deleteUser)
router.get('/:id', auth, getUserById)
router.put('/:id', auth, saveUser)
router.get('/:id/chats', auth, getAllChats)

router.get('/:id/contacts', auth, getUserContacts)
router.post('/:id/contacts', auth, addContact)
router.delete('/:id/contacts/:contactId', auth, deleteContact)

module.exports = router

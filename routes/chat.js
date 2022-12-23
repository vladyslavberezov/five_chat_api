const express = require('express')
const router = express.Router()
const { auth } = require('../middleware')
const {
  deleteChat,
  createChat,
  updateChat,
} = require('../controllers/chat.controller')
const {
  saveMessage,
  deleteMessage,
  getMessages,
  changeMessage,
} = require('../controllers/message.controller')


router.post('/', auth, createChat)
router.put('/:id', auth, updateChat)
router.delete('/:id', auth, deleteChat)

router.get('/:id/messages', auth, getMessages)
router.post('/:id/message', auth, saveMessage)
router.put('/:id/message/:id', auth, changeMessage)
router.delete('/:id/message/:id', auth, deleteMessage)


module.exports = router
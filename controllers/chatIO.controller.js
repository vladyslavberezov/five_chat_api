const { auth } = require('../sockets')
const { getChat } = require('../dao/Chat.DAO')
const { MessagesDAO } = require('../dao')
const { v4: uuidv4 } = require('uuid')
const { ConflictError, ForbiddenError } = require('../lib/errors')


class ChatIOController {
  io
  socket

  constructor(io, socket, socketUsers) {
    this.io = io
    this.socket = socket
    this.socketUsers = socketUsers
    auth(this.socket)
      .then((user) => {
        if (user) {
          this.socket.user = user
          this.socketUsers.set(parseInt(user.id), this.socket.id)
        }
      })
  }

  listen() {
    this.socket.on('chat_message', async (payload) => {
      const { chatId, message, userId } = payload

      const chat = await this.validateChat(chatId, userId)

      const uuid = uuidv4()
      chat.UserChats.map(async (userChat) => {
        const data = await MessagesDAO.saveMessage({
          authorId: parseInt(userId),
          userChatId: userChat.id,
          message,
          uuid,
        })
        const userSockets = this.socketUsers.get(parseInt(userChat.userId))
        userSockets.forEach((socketId) => {
          const userSocket = this.io.sockets.sockets.get(socketId);
          if (userSocket) {
            userSocket.emit('chat_message', { data })
          }
        })
      })
    })

    this.socket.on('chat_message_read', async (payload) => {
      try {
        const chat = await this.validateChat(payload.chatId, this.socket.user.id)
        chat.UserChats.map(async (userChat) => {
          const data = await MessagesDAO.changeMessage({
            uuid: payload.uuid,
            userChatId: userChat.id,
            isRead: true,
          })
          const userSockets = this.socketUsers.get(parseInt(userChat.userId))
          userSockets.forEach((socketId) => {
            this.io.sockets.sockets.get(socketId).emit('chat_message_read', { data })
          })
        })
      } catch (e) {
        console.log(e.message)
      }
    })

    this.socket.on('disconnect', (payload) => {
      console.log('socket:chat_leave', payload)
      if (this.socket.user) {
        this.socketUsers.delete(this.socket.user.id)
      }
    })
  }

  async validateChat(chatId, userId) {
    const chat = await getChat(chatId)
    if (!chat) {
      throw new ConflictError('Chat not found')
    }
    const userChat = chat.UserChats.find((userChats) => userChats.userId === parseInt(userId))
    if (!userChat) {
      throw new ForbiddenError('You must be a chat participant')
    }
    return chat
  }

}

module.exports = ChatIOController

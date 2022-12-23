const { Server } = require('socket.io')
const ChatIOController = require('../controllers/chatIO.controller')
const { SocketUsers } = require('./index')

function connectSocket(server) {
  const io = new Server(server)
  const socketUsers = new SocketUsers()

  io.on('connection', (socket) => {
    const chatIOController = new ChatIOController(io, socket, socketUsers)
    chatIOController.listen();
  })
}

module.exports = connectSocket
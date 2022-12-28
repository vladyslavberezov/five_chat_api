const { Server } = require('socket.io')
const ChatIOController = require('../controllers/chatIO.controller')
const { SocketUsers } = require('./index')

function connectSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  })
  const socketUsers = new SocketUsers()

  io.on('connection', (socket) => {
    const chatIOController = new ChatIOController(io, socket, socketUsers)
    chatIOController.listen();
  })
}

module.exports = connectSocket
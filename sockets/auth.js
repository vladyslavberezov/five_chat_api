const AccessTokenService = require('../services/token/access-token.service')
const { UnauthorizedError } = require('../lib/errors')
const { getUserById } = require('../dao/Users.DAO')

const auth = async (socket) => {
  try {
    const authHeader = socket.handshake.headers.authorization

    if (!authHeader) {
      throw new UnauthorizedError('No auth token provided')
    }

    const token = authHeader.split(' ')
    const decoded = await AccessTokenService.verify(token[1])

    const user = await getUserById(decoded.payload.userId)
    if (!user) {
      throw new UnauthorizedError('User not exists')
    }

    return user
  } catch (e) {
    socket.emit('error', { message: e.status ? e.message : 'Unauthorized' })
    socket.disconnect()
  }
}


module.exports = auth
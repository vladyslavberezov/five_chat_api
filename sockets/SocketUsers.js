class SocketUsers {
  users

  constructor() {
    this.users = new Map()
  }

  set(userId, socketId) {
    const userSockets = (this.users.get(userId) || [])
    this.users.set(userId, [...userSockets].concat([socketId]))
  }

  get(userId) {
    return this.users.get(userId) || []
  }

  delete(userId, socketId) {
    const userSockets = (this.users.get(userId) || [])

    if (userSockets.length === 1) {
      this.users.delete(userId)
    } else if (userSockets.length > 1) {
      const result = userSockets.filter(id => id !== socketId)
      this.users.set(userId, result)
    }
  }
}

module.exports = SocketUsers
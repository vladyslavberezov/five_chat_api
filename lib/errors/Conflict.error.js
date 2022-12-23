class ConflictError extends Error {
  status = 409

  constructor(props) {
    super(props || 'Bad request')
  }
}

module.exports = ConflictError

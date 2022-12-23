class ForbiddenError extends Error {
  status = 403

  constructor(props) {
    super(props || 'Bad request')
  }
}

module.exports = ForbiddenError

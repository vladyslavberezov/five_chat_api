class BadRequestError extends Error {
  status = 400

  constructor(props) {
    super(props || 'Bad request')
  }
}

module.exports = BadRequestError

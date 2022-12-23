class UnauthorizedError extends Error {
  status = 401

  constructor(props) {
    super(props || 'Unauthorized')
  }
}

module.exports = UnauthorizedError

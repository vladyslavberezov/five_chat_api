const BadRequestError = require('./BadRequest.error')
const NotFoundError = require('./NotFound.error')
const UnauthorizedError = require('./Unauthorized.error')
const ForbiddenError = require('./Forbidden.error')
const ConflictError = require('./Conflict.error')
const InternalServerError = require('./InternalServer.error')

module.exports = {
  NotFoundError,
  BadRequestError,
  ForbiddenError,
  ConflictError,
  UnauthorizedError,
  InternalServerError,
}

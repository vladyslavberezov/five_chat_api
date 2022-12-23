/**
 * asyncHandler function - catches errors
 * @param fn - API route handler
 * @returns {function(*, *, *): Promise<unknown>}
 */
const handleError = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next)
}

module.exports = handleError
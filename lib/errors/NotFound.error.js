class NotFoundError extends Error {
    status = 404

    constructor(props) {
        super(props)
    }
}

module.exports = NotFoundError

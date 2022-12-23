class InternalServerError extends Error {
    status = 500

    constructor(props) {
        super(props)
    }
}

module.exports = InternalServerError

class UserUnexistError extends Error {
    constructor(message) {
        super(message);
    }
}

module.exports = UserUnexistError;
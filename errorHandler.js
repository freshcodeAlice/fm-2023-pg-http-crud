const UserUnexistError = require('./errors/UserUnexistError');

module.exports.errorHandler = async (err, req, res, next) => {
    if(err instanceof UserUnexistError) {
       return res.status(404).send('User data is not valid');
    }

    res.status(500).send('Server error');
}
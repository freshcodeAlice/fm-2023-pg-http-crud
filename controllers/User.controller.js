
const UserUnexistError = require('../errors/UserUnexistError');
const {User} = require('../models/index');

module.exports.createOne = async (req, res, next) => {
    try {
        const createdUser = await User.create(req.body);
        res.status(201).send(createdUser);
    } catch(error) {
       next(new InvalidUserError('User data is invalid'));
    }


}

module.exports.getAll = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).send(users);
    } catch(error) {
       next({message: 'User not found'})
    }
}

module.exports.getOne = async (req, res, next) => {
    try {
        //req.params - id here is a STRING!!!!
        const pk = Number(req.params.id);
        if (!isNaN(pk)) {
            const user = await User.findByPk(pk);
            res.status(200).send(user);
        } else {
            res.status(404).send('Invalid id')
        }
    } catch(error) {
        next(new InvalidUserError('User data is invalid'));
    }
}


module.exports.deleteOne = async (req, res, next) => {
    try {
        const pk = Number(req.params.id);
        if (!isNaN(pk)) {
            const deletedUser = await User.deleteByPk(pk);
            res.status(200).send(deletedUser);
        } else {
            res.status(404).send('Invalid id')
        }
    } catch (error) {

    }
}


module.exports.updateOne = async (req, res, next) => {
    try {
        const pk = Number(req.params.id);
        const updateValues = req.body;
        const updatedUser = await User.updateByPk({id: pk, updateValues});
        res.status(200).send(updatedUser);
    }catch(error) {
        res.status(400);
    }
}
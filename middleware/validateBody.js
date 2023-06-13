const yup = require('yup');
const {format} = require('date-fns');
const {User} = require('../models');
const UserUnexistError = require('../errors/UserUnexistError');

const CREATE_BOAT_SCHEMA = yup.object({
    name: yup.string().required(),
    is_sea_able: yup.bool(),
    created_at: yup.date().max(new Date(), 'date must be earlier than today!').required(),
    water_displacement: yup.number(),
    max_speed: yup.number().required()
});

module.exports.validateBody = async (req, res, next) => {
    // req.body
    /*
{
    name: "SuperBoat",
    is_sea_able: true,
    created_at: "Mon Jun 12 2023 11:04:07 GMT+0300",
    water_displacement: 200,
    max_speed: 200
}
 Якщо дані не валідні - закривати запит res.status(400).send('Data is invalid')

    */

 req.body.created_at = format(new Date(req.body.created_at), 'yyyy-MM-dd');
 //new Date(req.body.created_at);
 try {
    const value = await CREATE_BOAT_SCHEMA.validate(req.body);
    console.log(req.body);
    next();
 } catch(error) {
    res.status(400).send(error.message);
 }


}


module.exports.validateUser = async (req, res, next) => {
    ///
    next('Your user is so invalid'); // Express see it as a error!
}

module.exports.isOwnerExists = async (req, res, next) => {
    try {
        const {owner_id} = req.body;
        if(!isNaN(owner_id)) {
            const [foundedUser] = await User.findByPk(owner_id);
            if (foundedUser) {
                return next();
            }
        }
        next(new UserUnexistError('User id is invalid'));
    } catch(error) {
        next(error)
    }
}
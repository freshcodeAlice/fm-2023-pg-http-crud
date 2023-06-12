const yup = require('yup');
const {format} = require('date-fns');

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
const {Boat} = require('../models/index');

module.exports.createBoat = async (req, res) => {
    //req.body
    try {
        const createdBoat = await Boat.create(req.body);
        res.status(201).send(createdBoat);
    } catch(error) {
        res.status(400).send('Oops');
    }


}
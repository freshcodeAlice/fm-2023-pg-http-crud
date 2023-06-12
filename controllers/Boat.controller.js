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

module.exports.getAllBoats = async (req, res) => {
    try {
        const boats = await Boat.findAll();
        res.status(200).send(boats);
    } catch(error) {
        res.status(400).send('Bad request');
    }
}

module.exports.getOne = async (req, res) => {
    try {
        //req.params - id here is a STRING!!!!
        const pk = Number(req.params.id);
        if (!isNaN(pk)) {
            const boat = await Boat.findByPk(pk);
            res.status(200).send(boat);
        } else {
            res.status(404).send('Invalid id')
        }
    } catch(error) {
        res.status(400);
    }
}
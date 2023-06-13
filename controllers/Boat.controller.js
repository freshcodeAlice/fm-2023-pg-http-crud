const {Boat} = require('../models/index');

module.exports.createOne = async (req, res, next) => {
    //req.body
    try {
        const createdBoat = await Boat.create(req.body);
        res.status(201).send(createdBoat);
    } catch(error) {
       next('Boat cannot be created');
    }


}

module.exports.getAll = async (req, res) => {
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


module.exports.deleteOne = async (req, res) => {
    try {
        const pk = Number(req.params.id);
        if (!isNaN(pk)) {
            const boat = await Boat.deleteByPk(pk);
            res.status(200).send(boat);
        } else {
            res.status(404).send('Invalid id')
        }
    } catch (error) {

    }
}


module.exports.updateOne = async (req, res) => {
    try {
        const pk = Number(req.params.id);
        const updateValues = req.body;
        const updatedBoat = await Boat.updateByPk({id: pk, updateValues});
        res.status(200).send(updatedBoat);
    }catch(error) {
        res.status(400);
    }
}
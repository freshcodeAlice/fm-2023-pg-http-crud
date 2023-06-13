const express = require('express');
const {validateBody, isOwnerExists} = require('../middleware/validateBody');
const BoatController = require('../controllers/Boat.controller');

const boatRouter = express.Router();

boatRouter.post('/', isOwnerExists, validateBody, BoatController.createOne); //endpoint
boatRouter.get('/', BoatController.getAll);
boatRouter.get('/:id', BoatController.getOne);
boatRouter.put('/:id', BoatController.updateOne);
boatRouter.delete('/:id', BoatController.deleteOne);


module.exports = boatRouter;
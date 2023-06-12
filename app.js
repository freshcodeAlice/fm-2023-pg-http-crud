const express = require('express');
const bodyParser = express.json();
const app = express();
const {validateBody} = require('./middleware/validateBody');
const BoatController = require('./controllers/Boat.controller');

app.post('/', bodyParser, validateBody, BoatController.createBoat); //endpoint
app.get('/', BoatController.getAllBoats);
app.get('/:id', BoatController.getOne);
module.exports = app;


/*
POST / - create boat
GET / - findAll
GET  --- ? --- findOne
PUT ---- update boat
DELETE ---- delete boat

*/

/*
endpoint + controller GET all

*/
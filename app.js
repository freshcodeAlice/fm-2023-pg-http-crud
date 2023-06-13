const express = require('express');
const bodyParser = express.json();
const app = express();
const {validateBody} = require('./middleware/validateBody');
const BoatController = require('./controllers/Boat.controller');
const UserController = require('./controllers/User.controller');


app.post('/boats/', bodyParser, validateBody, BoatController.createOne); //endpoint
app.get('/boats/', BoatController.getAll);
app.get('/boats/:id', BoatController.getOne);
app.put('/boats/:id', bodyParser, BoatController.updateOne);
app.delete('/boats/:id', BoatController.deleteOne);

app.post('/users/', UserController.createOne); //endpoint
app.get('/users/', UserController.getAll);
app.get('/users/:id', UserController.getOne);
app.put('/users/:id', UserController.updateOne);
app.delete('/users/:id', UserController.deleteOne);

module.exports = app;


/*
+POST / - create boat
+GET / - findAll
+GET  --- ? --- findOne
+PUT ---- update boat
+DELETE ---- delete boat


New task:
add user crud functional
POST -- create user
GET -- findAll users
GET /:id -- findOne user
PUT /:id -- update user
DELETE /:id --delete user

*/

/*
Декомпозиція
+1. Створити сутність юзера (таблицю в БД)
+2. Зв'язати лодки і юзерів (m:1)
+3. Створити модель юзера
+4. Змінити модель лодки, додати зв'язок з юзером (+ додати метод "привласнення лодки")
+5. Прописати контроллери для CRUD над юзером
+6. Прописати endpoint для юзера

*/
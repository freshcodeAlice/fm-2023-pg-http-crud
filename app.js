const express = require('express');
const bodyParser = express.json();
const app = express();
const {errorHandler} = require('./errorHandler');

const {validateBody, validateUser, isOwnerExists} = require('./middleware/validateBody');
const BoatController = require('./controllers/Boat.controller');
const UserController = require('./controllers/User.controller');
const boatRouter = require('./routes/boatRouter');

app.use(bodyParser); // буде використовувати bodyParser на всі роути (за умови наявності Content-Type заголовка)
app.use('/boats', boatRouter);


app.post('/users/', validateUser, UserController.createOne); //endpoint
app.get('/users/', UserController.getAll);
app.get('/users/:id', UserController.getOne);
app.put('/users/:id', UserController.updateOne);
app.delete('/users/:id', UserController.deleteOne);


app.use(errorHandler);

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



/*
якщо при створенні лодки отримуємо помилку неіснуючого юзера, маємо відповісти 403 статусом.
Створити кастомну помилку на такий випадок і обробити її errorHandler-ом

*/
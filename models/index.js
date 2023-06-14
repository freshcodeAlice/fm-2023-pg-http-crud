const {Client} = require('pg');
const configs = require('../configs/db.json');
const fs = require('fs');
const path = require('path');

const currentFileName = path.basename(__filename); /// index.js

const dbConfigs = configs['development'];

const client = new Client(dbConfigs);

client.connect();


/*
Refactor TODO:
1. Визначити, де ми є (адресу папки)
2. Прочитати назви всіх файлів в поточній папці, засунути їх в масив
3. Пройтися по всьому масиву і для кожної адреси викликати require(), щоби динамічно заімпортувати файл
4. Кожному заімпортованому дати посилання на клієнта та засунути в вихідний об'єкт експорту


*/

const db = {
    client
}

fs.readdirSync(__dirname)
.filter(fileName => /.js$/.test(fileName) && fileName !== currentFileName)
.forEach(fileName => {
    const absPathToFile = path.join(__dirname, fileName);
    const Model = require(absPathToFile);
    Model._client = client;
    db[Model.name] = Model;
});

process.on('beforeExit', () => {
    client.end();
})

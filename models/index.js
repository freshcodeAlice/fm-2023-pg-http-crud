const {Client} = require('pg');
const Boat = require('./Boat');
const configs = require('../configs/db.json');

const dbConfigs = configs['development'];

const client = new Client(dbConfigs);

client.connect();

Boat._client = client;

module.exports = {
    Boat,
    client
}
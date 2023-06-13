const {Client} = require('pg');
const Boat = require('./Boat');
const User = require('./User');
const configs = require('../configs/db.json');

const dbConfigs = configs['development'];

const client = new Client(dbConfigs);

client.connect();

Boat._client = client;
User._client = client;

process.on('beforeExit', () => {
    client.end();
})

module.exports = {
    Boat,
    User,
    client
}

/*
TODO: refactor require, client links, exports

*/
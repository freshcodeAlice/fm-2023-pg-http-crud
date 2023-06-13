class Boat {
    static _client = null;
    static _tableName = 'boats';
    static _attributes = {
        name: 'string',
        is_sea_able: 'boolean',
        created_at: 'string',
        water_displacement: 'int',
        max_speed: 'int'
    }


    static async create(insertValues) {
        const insertAttr = Object.entries(this._attributes) ///[['name', 'string'], ['is_sea_able', 'boolean'], ['created_at', 'date']]
        .filter(([attr, domain]) => attr in insertValues) ///[['name', 'string'], ['created_at', 'date']]
        .map(([attr]) => attr) /// ['name', 'created_at']

        const insertSchemaAtr = insertAttr.map(attr => `"${attr}"`).join(',');

        const insertValuesStr = insertAttr.map(attr => {
            const value = insertValues[attr];
           return typeof value === 'string' ? `'${value}'` : value;
        }).join(',');

        const str = `INSERT INTO ${this._tableName} (${insertSchemaAtr}) VALUES (${insertValuesStr}) RETURNING *;`

        const {rows} = await this._client.query(str);

        return rows;

    }

    /*
INSERT INTO boats (name, is_sea_able, created_at, water_displacement, max_speed)
VALUES (
    'name:character varying',
    is_sea_able:boolean,
    'created_at:date',
    water_displacement:integer,
    max_speed:integer
  );

    */

    static async findByPk(pk) {
        const {rows} = await this._client.query(`SELECT * FROM ${this._tableName} WHERE id = ${pk};`)
        return rows;
    }

    static async findAll() {
        const {rows} = await this._client.query(`SELECT * FROM ${this._tableName};`);
        return rows;
    }

    static async updateByPk({id, updateValues}){
        const insertAttr = Object.entries(this._attributes) ///[['name', 'string'], ['is_sea_able', 'boolean'], ['created_at', 'date']]
        .filter(([attr, domain]) => attr in updateValues) ///[['name', 'string'], ['created_at', 'date']]
        .map(([attr]) => attr) /// ['name', 'created_at']

        const insertValueStr = insertAttr.map(attr => {
            const value = updateValues[attr];
            return `${attr} = ${typeof value === 'string' ? `'${value}'` : value}`
        }).join(',');

        const {rows} = await this._client.query(`UPDATE ${this._tableName} SET ${insertValueStr}
                                            WHERE id = ${id}
                                            RETURNING *;`);
        return rows;


    }

    static async deleteByPk(pk){
        const {rows} = await this._client.query(`DELETE FROM ${this._tableName} WHERE id = ${pk} RETURNING *;`);
        return rows;
    }
}

module.exports = Boat;

    /*
{
    name: 'Superboad',
    isSeaAble: true,
    createdAt: 2020-10-10,
    waterDisplacement: 10,
    maxSpeed: 100
}

    */
class User {
    static _client = null;
    static _tableName = 'users';
    static name = 'User';
    
    static _attributes = {
      first_name: 'string',
      last_name: 'string',
      email: 'string',
      boat_license: 'int'
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

module.exports = User;

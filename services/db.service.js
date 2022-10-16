const { Client } = require('pg');

class DbService {
    constructor() {
        this.con = new Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
        })
    }

    connect() {
        this.con.connect((err, dbresult) => {
            console.log('Connected to DATABASE')
        })
        return this
    }

    async cursor(sql, sql_data) {
        return await this.con.query(sql, sql_data)
    }
}

module.exports = DbService;

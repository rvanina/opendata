const sqlite3 = require('sqlite3').verbose()

const Data = () => {
    this.db = new sqlite3.Database('./data/data.db', (err) => {
        if (err) {
            console.error(err.message)
        }
        console.log('Connected to database.')
    });
    createTable('federal')
    createTable('regional')
}

const createTable = (name) => {
    let sql = `CREATE TABLE IF NOT EXISTS ${name} (
        id number PRIMARY KEY,
        name text NOT NULL,
        parent_id number,
        value number
    )`;
    
    this.db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        console.log(`Table ${name} was created.`)
    })
}

module.exports = Data;

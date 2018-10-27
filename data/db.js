const sqlite3 = require('sqlite3').verbose()

const Data = () => {
    this.db = new sqlite3.Database('./data/data.db', (err) => {
        if (err) {
            console.error(err.message)
        }
        console.log('Connected to database.')
    })
    createTable('municipal')
    createTable('regional')
}

const createTable = (name) => {
    let sql = `CREATE TABLE IF NOT EXISTS ${name} (
        id number PRIMARY KEY,
        name text NOT NULL,
        parent_id number,
        value number
    )`
    
    this.db.run(sql, [], (err, rows) => {
        if (err) {
            throw err
        }
        console.log(`Table ${name} was created.`)
    })
}

Data.prototype.getData = (parent_id, type) => {
    let sql = `SELECT * FROM ${type}
        WHERE parent_id = ${parent_id}
    `

    db.all(sql, (err, rows) => {
        if (err) {
            throw err
        }
        return rows
    })
}

const insertData = (data, tableName) => {
    let sql = `INSERT INTO ${tableName}(id number, name text, parent_id number,
        value number)
        VALUES(${data.id}, ${data.name}, ${data.parent_id}, ${data.value})`

    this.db.run(sql)
}

Data.prototype.query = (sql, parameters) => {
    return this.db.all(sql, parameters, (err, row) => {
        if (err) {
            throw err
        }
        return row
    })
}

module.exports = Data

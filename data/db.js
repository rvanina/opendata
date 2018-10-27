const sqlite3 = require('sqlite3').verbose()


class Data {
    constructor() {
        this.db = new sqlite3.Database('./data/data.db', (err) => {
            if (err) {
                console.error(err.message)
            }
            console.log('Connected to database.')
        })
    }

    createTable(name) {
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

    getData(parentId, type) {
        let op = parentId ? '==' : 'is'
        let sql = `SELECT * FROM ${type} WHERE parent_id ${op} ${parentId}`

        this.db.all(sql, (err, rows) => {
            if (err) {
                throw err
            }
            return rows
        })
    }

    insertData(data, tableName) {
        let sql = `INSERT INTO ${tableName}(id, name, parent_id, value)
            VALUES(${data.id}, '${data.name}', ${data.parentId}, ${data.value})`

        this.db.run(sql)
    }
}

module.exports = Data

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
            id integer PRIMARY KEY AUTOINCREMENT,
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
        return new Promise((resolve, reject) => {
            let op = parentId ? '==' : 'is'
            parentId = parentId == undefined ? null : parentId
            let sql = `SELECT * FROM ${type} WHERE parent_id ${op} ${parentId}`

            this.db.all(sql, (err, rows) => {
                if (err) {
                    reject(err)
                }
                resolve(rows)
            })
        })
    }

    insertData(tableName, data) {
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO ${tableName}(name, parent_id, value)
            VALUES('${data.name}', ${data.parent_id}, ${data.value})`
            console.log(data)
            this.db.run(sql, function(err) { if (err) reject(err) ; resolve(this.lastID) })
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

module.exports = Data

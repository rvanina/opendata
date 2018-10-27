const sqlite3 = require('sqlite3').verbose()


class Data {
    constructor(config) {
        const { munData, regData } = config
        this.db = new sqlite3.Database('./data/data.db', (err) => {
            if (err) {
                console.error(err.message)
            }
            console.log('Connected to database.')
        })
        this.createTable('municipal')
        this.createTable('regional')
        munData ? munData.forEach(data => {
            this.insertData(data, 'municipal')
        }) : 0
        regData ? regData.forEach((data => {
            this.insertData(data, 'regional')
        })) : 0
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
        let sql = `SELECT * FROM ${type}
            WHERE parent_id = ${parentId}
        `

        db.all(sql, (err, rows) => {
            if (err) {
                throw err
            }
            return rows
        })
    }

    insertData(data, tableName) {
        let sql = `INSERT INTO ${tableName}(id number, name text, parent_id number,
            value number)
            VALUES(${data.id}, ${data.name}, ${data.parentId}, ${data.value})`

        this.db.each(sql, (err) => {
            if (err) {
                throw err
            }
        })
    }

    query(sql, parameters) {
        return this.db.all(sql, parameters, (err, row) => {
            if (err) {
                throw err
            }
            return row
    })}
}

module.exports = Data

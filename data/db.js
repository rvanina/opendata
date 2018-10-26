const sqlite3 = require('sqlite3').verbose();

const Data = (config) => {
    this.config = config;
    this.db = new sqlite3.Database('./data/data.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to database.');
    });
}

Data.prototype.createTable = (table_name) => {
    let sql = `CREATE TABLE ${name}(
        id number PRIMARY KEY,
        name text NOT NULL
        )`;
    
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        console.log('Table was created.');
    })
}

Data.prototype.close = () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close database connection.');
    })
}

module.exports = Data;

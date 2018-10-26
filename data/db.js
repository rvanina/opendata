const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./data/data.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to database.');
});

db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Close database connection.');
})

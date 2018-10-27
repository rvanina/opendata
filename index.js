const express = require('express')

const Api = require('./api')
const CsvLoader = require('./data/csvLoader')
const Data = require('./data/db')

const app = express()

const port = 80

app.use('/', express.static('front/build'))

const data = new Data()

const api = new Api({
    data: null,
    db: db,
})

const csvLoader = new CsvLoader(data)

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', '*')
    next()
})

app.get('/api/regional', (req, res) => {
    res.json(api.getRegional(req.query.categoryId))
})

app.get('/api/municipal', (req, res) => {
    res.json(api.getMunicipal(req.query.categoryId))
})

app.get('/parseData/:path', (req, res) => {
    csvLoader
        .loadData('municipal', req.params.path)
        .then((data) => res.send(data))
})

app.get('/clearTable/:tableName', (req, res) => {
    data
        .clearTable(req.params.tableName)
        .then(() => res.send('done'))
})

app.listen(port, function () {
    console.log("Running on port: " + port)
})

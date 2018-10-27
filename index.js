const express = require('express')

const Api = require('./api')

const Data = require('./data/db')

const db = new Data()

const app = express()

const port = 8008;

app.use('/', express.static('front/build'))

const api = new Api({
    data: null,
    db: db,
})

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

app.listen(port, function () {
    console.log("Running on port: " + port)
})

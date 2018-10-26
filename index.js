const express = require('express')

const Api = require('./api')

const app = express()

const port = 80;

app.use('/', express.static('front/build'))

const api = new Api({
    data: null,
})

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', '*')
    next()
})

app.get('/api/regional', (req, res) => {
    api.getRegional(req.query.categoryId).then(results => res.json(results))
})

app.get('/api/municipal', (req, res) => {
    api.getMunicipal(req.query.categoryId).then(results => res.json(results))
})

app.listen(port, function () {
    console.log("Running on port: " + port)
})

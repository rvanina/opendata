const express = require('express');

const app = express();

const port = 80;

app.use('/', express.static('front/build'))

app.use(function (req, res, next) {
    res.append('Access-Control-Allow-Origin', '*');
    next();
});

app.listen(port, function () {
    console.log("Running on port: " + port)
});

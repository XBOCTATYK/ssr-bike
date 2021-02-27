const express = require('express');

let router = express.Router();

router.get('/', function (req, res) {
    res.append( 'Content-Type', 'application/json');
    res.write(`{ "list": [
        { "id": 2, "title": "fuf" },
        { "id": 1, "title": "wow" } 
    ] }`)
    res.end();
})

module.exports = router;

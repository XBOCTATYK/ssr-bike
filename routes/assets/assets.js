const express = require('express');

let router = express.Router();

router.get('/', function (req, res) {
    console.log(__dirname)
    console.log(req.params)

    res.end();
})

module.exports = router;

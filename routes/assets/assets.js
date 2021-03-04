const express = require('express');
const path = require('path');

let router = express.Router();

router.get('/:filePath', function (req, res) {
    const { filePath } = req.params;

    const options = {
        root: path.join(__dirname, 'assets'),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }

    res.sendFile(filePath, options, (err) => {
        if (err) {
            console.log(err);
        }

        res.end();
    })
})

module.exports = router;

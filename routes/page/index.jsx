const express = require('express');
const React = require('react');
const ReactDOM = require('react-dom/server');
const { valuesOnServer } = require('../../components/hooks/useSsrRequest');
const { GameList } = require('../../components/game-list/game-list');

let router = express.Router();

router.get('/', async function (req, res) {
    const app = ReactDOM.renderToString(<div id="app"><GameList /></div>)

    const [appWithRequests, data] = await valuesOnServer(app);

    res.write(`
<!DOCTYPE html>
    <html lang="en">
    <head>
    <title>SSR!</title>
    <meta charset="utf-8"/>
</head>
        <body>
        hello!
            ${appWithRequests}
        </body>
        <script> window.__data__ = ${JSON.stringify(data)}</script>
        <script src="/assets/client.js"></script>
    </html>
    `);
    res.end()
});

module.exports = router;

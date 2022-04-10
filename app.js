const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist'));
app.use('/three/', express.static(path.join(__dirname, 'node_modules/three')))
app.use('/cannon/', express.static(path.join(__dirname, 'node_modules/cannon')))
app.listen(4001, () => {
    console.log("visit http://127.0.0.1:4001")
})
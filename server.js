const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();

const PORT = 9000

app.use("/static", express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(PORT);
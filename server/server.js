const express = require('express');
const path = require('path');

const app = express();

const PORT = 8080;

app.use('/static', express.static(path.join(__dirname, '/')));
app.use('/css', express.static(path.join(__dirname, '/')));
app.use('/img', express.static(path.join(__dirname, '/')));
app.use('/js', express.static(path.join(__dirname, 'js/')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT);

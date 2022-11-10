const express = require('express');
const path = require('path');

const app = express();

const PORT = 8000;

app.use('/static', express.static(path.join(__dirname, '/')));
app.use('/css', express.static(path.join(__dirname, '/')));
app.use('/image', express.static(path.join(__dirname, '/image')));
app.use('/js', express.static(path.join(__dirname, './js/')));
app.use('/vacancy/js', express.static(path.join(__dirname, './js/')));

app.get('*', (req, res) => {
    console.log(req.headers);
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT);

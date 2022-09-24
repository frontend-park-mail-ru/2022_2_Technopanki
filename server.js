const express = require('express');
const path = require('path');

const app = express();

const PORT = 9000

app.use("/static", express.static(path.join(__dirname, 'static')));
app.use("/img", express.static(path.join(__dirname, 'static/img')))
app.use("/js", express.static(path.join(__dirname, "static/js")))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/signup.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, `/signup.html`));
});

app.get('/auth', (req, res) => {
    res.sendFile(path.join(__dirname, '/auth.html'))
})

app.listen(PORT);
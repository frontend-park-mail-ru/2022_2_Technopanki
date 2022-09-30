const express = require('express');
const path = require('path');

const app = express();

const PORT = 8000;

app.use('/static', express.static(path.join(__dirname, 'src/static/')));
app.use('/css', express.static(path.join(__dirname, 'src/styles/css')));
app.use('/img', express.static(path.join(__dirname, 'src/static/')));
app.use('/js', express.static(path.join(__dirname, 'src/')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/static/index.html'));
});

// app.get('/signup', (req, res) => {
//     res.sendFile(path.join(__dirname, '/signup.html'));
// });

// app.get('/auth', (req, res) => {
//     res.sendFile(path.join(__dirname, '/auth.html'));
// });

// app.get('/test', (req, res) => {
//     res.sendFile(path.join(__dirname, '/src/views/index.html'));
// });

app.listen(PORT);

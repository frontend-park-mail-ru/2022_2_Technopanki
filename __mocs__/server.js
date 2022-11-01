const express = require('express');
const cors = require('cors');
const PORT = 8080;

const corsOptions = {
    credentials: true, // This is important.
    origin: (origin, callback) => {
        if (origin === 'http://localhost:8000') return callback(null, true);
        callback(new Error(`Not allowed by CORS. Origin: ${origin}`));
    },
};

const app = express();

app.use(cors(corsOptions));

app.post('/auth/sign-up', (req, res) => {
    if (req.body.applicant_name) {
        res.status(200).send();
    } else {
        res.status(400).send();
    }
});

app.post('/auth/sign-in', (req, res) => {
    res.json({ name: 'Vladislav', surname: 'Kirpichov' });
    res.status(200).send();
});

app.listen(PORT);

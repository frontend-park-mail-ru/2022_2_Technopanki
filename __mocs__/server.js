const express = require('express');
const cors = require('cors');
const PORT = 8080;

const users = require('./user.js');
let { defaultVacancy, vacancies, responses } = require('./vacancy.js');

const corsOptions = {
    credentials: true, // This is important.
    origin: (origin, callback) => {
        if (origin === 'http://localhost:8000') return callback(null, true);
        callback(new Error(`Not allowed by CORS. Origin: ${origin}`));
    },
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.post('/auth/sign-up', (req, res) => {
    console.log('sign-up');
    res.json({ id: 1 });
});

app.post('/auth/sign-in', (req, res) => {
    if (req.body.email === 'test@mail.ru') {
        res.status(400);
        res.json({
            message: 'Пользователь с таким email уже существует',
            type: 'email',
        });
        return;
    }

    if (req.body.password === '12345vv!!') {
        res.status(400);
        res.json({
            message: 'Ошибка в пароле',
            type: 'password',
        });
        return;
    }

    res.json(users.user);
});

app.get('/api/user/safety/:id', (req, res) => {
    console.log(req.params.id);

    res.status(200);

    if (req.params.id === '2') {
        res.json(users.specialUser);
    } else {
        res.json(users.user);
    }
});

app.post('/api/user', (req, res) => {
    console.log(req.body.field_of_activity);

    if (req.body.id === 2) {
        users.specialUser = { ...users.specialUser, ...req.body };
    } else {
        users.user = { ...users.user, ...req.body };
    }

    console.log(users.user);

    res.status(200);
});

app.get('/api/user/preview/:id', (req, res) => {
    res.json({
        id: 1,
        creator_img_src: './',
        company_name: 'VK',
        status: 'Место встречи профессионалов',
    });
});

app.get('/api/vacancy/', (req, res) => {
    console.log('api/vacancy');
    res.json(vacancies);
});

app.get('/api/vacancy/:id', (req, res) => {
    console.log('/api/vacancy');
    res.json(defaultVacancy);
});

app.post('/api/vacancy/new', (req, res) => {
    vacancies.push(req.body);
    console.log(vacancies[vacancies.length - 1]);

    res.status(200).send();
});

app.post('/api/image', (req, res) => {
    console.log('/api/image');
    res.json({
        id: vacancies.length,
    });
});

app.get('/api/vacancies/responses/:id', (req, res) => {
    console.log(req);
    res.json(responses);
});

app.listen(PORT);

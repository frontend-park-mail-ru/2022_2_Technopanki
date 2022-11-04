const express = require('express');
const cors = require('cors');
const PORT = 8080;

const users = require('./user.js');
let { defaultVacancy } = require('./vacancy.js');

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
    res.json({ id: '1' });
});

app.post('/auth/sign-in', (req, res) => {
    res.json({
        id: '2',
        name: 'Vladislav',
        surname: 'Kirpichov',
        user_type: 'applicant',
    });
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
    console.log();

    if (req.body.id === 2) {
        users.specialUser = { ...users.specialUser, ...req.body };
    } else {
        users.user = { ...users.user, ...req.body };
    }

    res.status(200);
});

app.get('/api/user/:id/preview', (req, res) => {
    res.json({
        creator_img_src: './',
        company_name: 'VK',
        status: 'Место встречи профессионалов',
    });
});

app.get('/api/vacancy/:id', (req, res) => {
    res.json(defaultVacancy);
});

app.put('/api/vacancy/:id', (req, res) => {
    defaultVacancy = {
        ...defaultVacancy,
        ...req.body,
    };

    res.status(200).send();
});

app.get('/api/vacancy/new', (req, res) => {
    res.json({
        id: '2',
        postedByUserID: '2',
        jobType: 'hello',
        title: 'Это пример новой вакансии!\n',
        createdDate: '21.02.2022',
        description: 'Hello world!',
        salary: '240.000',
        location: 'Москва',
        isActive: true,
    });

    res.status(200).send();
});

app.post('/api/image', (req, res) => {
    console.log(req.data);
    console.log(
        res.json({
            payload: 'hello world!',
        }),
    );

    res.status(200).send();
});

app.listen(PORT);

const express = require('express');
const cors = require('cors');
const PORT = 8080;

const users = require('./user.js');

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
    console.log(req.body.field_of_activity);

    if (req.body.id === 2) {
        users.specialUser = { ...users.specialUser, ...req.body };
    } else {
        users.user = { ...users.user, ...req.body };
    }

    console.log(users.user);

    res.status(200);
});

app.get('/api/vacancy/1', (req, res) => {
    res.json({
        id: '1',
        postedByUserID: '2',
        jobType: 'hello',
        title: 'Фронтенд-разработчик (VK Play)\n',
        createdDate: '21.02.2022',
        description:
            'Мы помогаем людям объединяться для того, что для них действительно важно. С нами ты будешь создавать и развивать сервисы для миллионов пользователей, которые помогают общаться, работать, учиться, решать бытовые задачи и развлекаться. Для нас важно делать технологии доступными для каждого и постоянно совершенствовать наши продукты.\n' +
            '\n' +
            'Наша команда — это профессионалы из разных сфер, которые умеют реализовывать необычные и сложные идеи и задачи. Обмениваясь опытом, мы создаём новые идеи и достигаем большего.\n' +
            '\n' +
            'Если ты любишь решать сложные задачи, экспериментировать и создавать продукты для миллионов пользователей — присоединяйся, чтобы вместе развивать интернет и определять его будущее.\n' +
            '\n',
        salary: '240.000',
        location: 'Москва',
        isActive: true,
    });

    res.status(200).send();
});

app.get('/api/vacancy/2', (req, res) => {
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

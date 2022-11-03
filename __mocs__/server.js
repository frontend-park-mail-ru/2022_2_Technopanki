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
    res.json({
        id: req.params.id,
        postedByUserID: 2,
        jobType: 'hello',
        title: 'Фронтенд-разработчик (VK Play)',
        description:
            'Мы помогаем людям объединяться для того, что для них действительно важно. С нами ты будешь создавать и развивать сервисы для миллионов пользователей, которые помогают общаться, работать, учиться, решать бытовые задачи и развлекаться. Для нас важно делать технологии доступными для каждого и постоянно совершенствовать наши продукты.\n' +
            '\n' +
            'Наша команда — это профессионалы из разных сфер, которые умеют реализовывать необычные и сложные идеи и задачи. Обмениваясь опытом, мы создаём новые идеи и достигаем большего.\n' +
            '\n' +
            'Если ты любишь решать сложные задачи, экспериментировать и создавать продукты для миллионов пользователей — присоединяйся, чтобы вместе развивать интернет и определять его будущее.',
        tasks:
            'разработка новой и поддержка существующей функциональности для проекта vkplay.live\n' +
            'ревью кода (делаем это всей командой)\n' +
            'участие в проектировании архитектуры фронтенда\n' +
            'участие в обсуждении реализации и планировании задач',
        requirements:
            'отличные знания JavaScript\n' +
            'уверенные навыки кроссбраузерной и адаптивной верстки (HTML5, CSS3, SCSS/LESS)\n' +
            'опыт использования React, Redux\n' +
            'опыт работы с git',
        extra:
            'знание TypeScript;\n' +
            'опыт работы с Node.js;\n' +
            'знание других языков программирования;\n' +
            'навыки в области безопасности клиентских web-приложений;\n' +
            'профиль на GitHub с личными проектами.',
        // For sidebar
        createdDate: '21.02.2022',
        salary: '240.000',
        location: 'Москва',
        isActive: true,
        experience: '3-6 лет',
        hours: '40 часов в неделю',
        format: 'Смешанный формат',
        skills: ['JavaScript', 'Git', 'CSS3', 'HTML5', 'React'],
    });
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

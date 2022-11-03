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
    const defaultAnswer = {
        id: '1',
        user_type: 'employer',
        description:
            'Мы помогаем людям объединяться для того, что для них действительно важно. С нами ты будешь создавать и развивать сервисы для миллионов пользователей, которые помогают общаться, работать, учиться, решать бытовые задачи и развлекаться. Для нас важно делать технологии доступными для каждого и постоянно совершенствовать наши продукты.\n' +
            '\n' +
            'Наша команда — это профессионалы из разных сфер, которые умеют реализовывать необычные и сложные идеи и задачи. Обмениваясь опытом, мы создаём новые идеи и достигаем большего.\n' +
            '\n' +
            'Если ты любишь решать сложные задачи, экспериментировать и создавать продукты для миллионов пользователей — присоединяйся, чтобы вместе развивать интернет и определять его будущее.',
        date_of_birth: null,
        image: './',
        status: 'Место встречи профессионалов',
        applicant_name: null,
        applicant_surname: null,
        company_name: 'VK',
        business_type: '',
        company_website_url: '',
        phone: '+7 (999) 999-99-99',
        email: 'example@mail.ru',
        company_city: 'Москва',
        company_size: 10000,
        field_of_activity: [
            'Информационные технологии',
            'Интернет',
            'Социальные технологии',
            'SMM',
            'Системная интеграция',
        ],
        socialNetworks: {
            vk: 'https://vk.com',
            facebook: 'https://facebook.com',
            telegram: 'https://t.me',
        },
    };

    const specialAnswer = {
        id: '2',
        user_type: 'employer',
        description:
            'Данный пользователь доступен только по пути /api/user/safety/2',
        date_of_birth: null,
        image: './',
        status: 'В нем приходит тестовое сообщение для проверки работы рендера.',
        applicant_name: null,
        applicant_surname: null,
        company_name: 'Это тестовый url',
        business_type: '',
        company_website_url: '',
        phone: '+7 (999) 999-99-99',
        email: 'example@mail.ru',
        company_city: 'Москва',
        company_size: 10000,
        field_of_activity: ['test', 'test'],
        socialNetworks: {
            vk: 'https://vk.com',
            facebook: 'https://facebook.com',
        },
    };

    console.log(req.params.id);

    res.status(200);

    if (req.params.id === '2') {
        res.json(specialAnswer);
    } else {
        res.json(defaultAnswer);
    }
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

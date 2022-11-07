const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
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
app.use(cookieParser());
app.use(express.json());

app.post('/auth/sign-up', (req, res) => {
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

    res.cookie('session', '123');
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

    res.cookie('session', '123');
    res.json(users.user);
});

app.get('/api/user/safety/:id', (req, res) => {
    console.log(users.user);

    res.status(200);

    if (req.params.id === '2') {
        res.json(users.specialUser);
    } else {
        res.json(users.user);
    }
});

app.post('/api/user/safety/:id', (req, res) => {
    console.log(req.body.image);

    if (req.params.id === 2) {
        users.specialUser = { ...users.specialUser, ...req.body };
    } else {
        users.user.company_name = req.body.company_name;
        users.user.description = req.body.description;
    }

    console.log(users.user);

    res.json({ status: 'ok' });
});

// TODO: поменять путь
app.get('/api/user/preview/:id', (req, res) => {
    res.json({
        id: 1,
        creator_img_src: './',
        company_name: 'VK',
        status: 'Место встречи профессионалов',
    });
});
app.get('/api/user/:id/preview', (req, res) => {
    const applicantPreview = {
        creator_img_src: './',
        name: 'Sonya',
        surname: 'Sitnichenko',
        status: 'BMSTU student',
    };

    if (req.params.id === '3') {
        res.json(applicantPreview);
    } else {
        res.json({
            creator_img_src: './',
            company_name: 'VK',
            status: 'Место встречи профессионалов',
        });
    }
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

app.get('/api/resume/:id', (req, res) => {
    res.json({
        id: req.params.id,
        postedByUserID: 3,
        title: 'Фронтенд-разработчик',
        description:
            'В последние годы проходил обучение без возможности работать. Владею продвинутыми знаниями Bootstrap, Javascript, Vue.js. Работал с нативным PHP, MVC-фреймворком Laravel, Android Studio\n' +
            'Мой GitHub: https://github.com/IvanProtsenko\n' +
            'Реализовал проект в рамках Школы IT-решений. Проходил месячную стажировку в КРОК инкорпорейтед\n' +
            'Более года работал с проектами на node.js,\n' +
            'Работал с mongodb, web-socket, express.js, участвовал в исправлении npm-модуля\n' +
            'Имеется опыт работы с школьниками, читаю лекции в технопарке МАИ\n' +
            'Дважды призёр Rucode',
        university: 'МГТУ им. Баумана',
        faculty:
            'Информационное управление, Информационные системы и технологии',
        status: 'Неоконченное высшее',
        // For sidebar
        location: 'Москва',
        dateOfBirth: '21.02.2002',
        skills: ['JavaScript', 'Git', 'CSS3', 'HTML5', 'React'],
        vk: 'https://vk.com',
        facebook: 'https://facebook.com',
        telegram: 'https://t.me',
        isActive: true,
    });
});

app.get('/api/applicant/:id', (req, res) => {
    res.json({
        id: req.params.id,
        name: 'Sofya',
        surname: 'Sitnichenko',
        status: 'BMSTU student',
        phone: '+7-999-999-99-99',
        email: 'example@mail.ru',
        location: 'Москва',
        dateOfBirth: '21.02.2002',
        skills: ['JavaScript', 'Git', 'CSS3', 'HTML5', 'React'],
        vk: 'https://vk.com',
        facebook: 'https://facebook.com',
        telegram: 'https://t.me',
    });
});

app.get('/api/applicant/resumes/:id', (req, res) => {
    res.json([
        {
            id: '1',
            imgSrc: './',
            name: 'Владислав',
            surname: 'Кирпичов',
            resumeTitle: 'Фронтенд-разработчик',
            timeWhenCreated: '2022-09-08T14:35Z',
            skills: ['CSS3', 'HTML5', 'React'],
            resumeSrc: './',
        },
        {
            id: '2',
            imgSrc: './',
            name: 'Владислав',
            surname: 'Кирпичов',
            resumeTitle: 'Фронтенд-разработчик',
            timeWhenCreated: '2022-09-08T14:35Z',
            skills: ['CSS3', 'HTML5', 'React'],
            resumeSrc: './',
        },
        {
            id: '3',
            imgSrc: './',
            name: 'Владислав',
            surname: 'Кирпичов',
            resumeTitle: 'Фронтенд-разработчик',
            timeWhenCreated: '2022-09-08T14:35Z',
            skills: ['CSS3', 'HTML5', 'React'],
            resumeSrc: './',
        },
    ]);
});

app.get('/api/user/image/:id', (req, res) => {
    console.log(req.body);

    res.status(200);
});

app.get('/authh', (req, res) => {
    if (req.headers.cookie.split(' ')[1].split('=')[1] === '123') {
        console.log('right cookie');
        res.json(users.user);
        return;
    }

    res.status(401).send();
});

app.listen(PORT);

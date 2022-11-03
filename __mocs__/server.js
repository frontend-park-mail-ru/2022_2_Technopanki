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

app.get('/api/user/safety', (req, res) => {
    console.log(req.headers);
    res.status(200);
    res.json({
        user_type: 'employer',
        description: 'Hello world!',
        date_of_birth: null,
        image: '',
        applicant_name: null,
        applicant_surname: null,
        company_name: 'VK',
        business_type: '',
        company_website_url: '',
    });
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

app.listen(PORT);

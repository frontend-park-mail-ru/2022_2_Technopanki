const user = {
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

const specialUser = {
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

module.exports = {
    user,
    specialUser,
};

let defaultVacancy = {
    id: 1,
    postedByUserId: 1,
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
};

let testVacancy = {
    id: 2,
    postedByUserId: 2,
    jobType: 'hello',
    title: 'Тестовая вакансия',
    description: 'Hello world!',
    tasks: 'Hello world!',
    requirements: 'Hello world!',
    extra: 'Hello world!',
    // For sidebar
    createdDate: '20.02.2022',
    salary: '400.000',
    location: 'Москва',
    isActive: true,
    experience: '3-5 лет',
    hours: '40 часов в неделю',
    format: 'Смешанный формат',
    skills: ['JS', 'Git', 'CSS3', 'HTML5', 'React'],
};

let vacancies = [
    defaultVacancy,
    testVacancy,
    defaultVacancy,
    testVacancy,
    defaultVacancy,
    testVacancy,
    defaultVacancy,
    testVacancy,
    defaultVacancy,
    testVacancy,
    defaultVacancy,
    testVacancy,
    defaultVacancy,
    testVacancy,
    defaultVacancy,
    testVacancy,
    defaultVacancy,
    testVacancy,
    defaultVacancy,
    testVacancy,
    defaultVacancy,
    testVacancy,
    defaultVacancy,
    testVacancy,
    defaultVacancy,
    testVacancy,
    defaultVacancy,
    testVacancy,
    defaultVacancy,
    testVacancy,
    defaultVacancy,
    testVacancy,
    defaultVacancy,
    testVacancy,
    defaultVacancy,
    testVacancy,
    defaultVacancy,
    testVacancy,
    defaultVacancy,
    testVacancy,
    defaultVacancy,
    defaultVacancy,
    defaultVacancy,
    defaultVacancy,
    defaultVacancy,
    defaultVacancy,
    defaultVacancy,
    defaultVacancy,
    defaultVacancy,
    defaultVacancy,
    defaultVacancy,
    defaultVacancy,
    defaultVacancy,
    defaultVacancy,
];

let response = {
    id: 1,
    imgSrc: './',
    name: 'Vladislav',
    surname: 'Kirpichov',
    resumeTitle: 'Фронтенд-разработчик',
    timeThenCreated: '2022-09-09T00:00Z',
    chips: [],
    resumeSrc: './',
};

let responses = [];
for (let i = 0; i < 100; ++i) {
    responses.push(response);
}

module.exports = {
    defaultVacancy,
    testVacancy,
    vacancies,
    responses,
};

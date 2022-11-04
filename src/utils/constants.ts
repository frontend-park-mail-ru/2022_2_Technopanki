export const SERVER_URL = 'http://localhost:8080/';

export const SERVER_URLS = {
    SIGN_UP: SERVER_URL + 'auth/sign-up',
    SIGN_IN: SERVER_URL + 'auth/sign-in',

    VACANCIES: SERVER_URL + 'api/vacancies/',
    VACANCY: SERVER_URL + 'api/vacancy/',
    VACANCY_NEW: SERVER_URL + 'api/vacancy/new/',

    USER: SERVER_URL + 'api/user/',
    USER_SAFE: SERVER_URL + 'api/user/safety/',
    USER_PREVIEW: (userID: string) =>
        SERVER_URL + 'api/user/' + userID + '/preview',
    IMAGE: SERVER_URL + 'api/image',
};

export const SERVER_URL = 'http://localhost:8080/';
export const IMAGE_URL = SERVER_URL + 'data/image/';

export const USER_URLS = {
    SIGN_UP: SERVER_URL + 'auth/sign-up',
    SIGN_IN: SERVER_URL + 'auth/sign-in',
    AUTH: SERVER_URL + 'auth/',
    LOGOUT: SERVER_URL + 'auth/logout/',
};

export const PROFILE_URLS = {
    APPLICANT: SERVER_URL + 'api/user/',
    APPLICANT_RESUMES: SERVER_URL + 'api/applicant/resumes/',
    USER: SERVER_URL + 'api/user/',
    USER_SAFE: SERVER_URL + 'api/user/safety/',
    USER_PREVIEW: (userID: string) => {
        return SERVER_URL + 'api/user/preview/' + userID;
    },
};

export const VACANCY_URLS = {
    VACANCIES: SERVER_URL + 'api/vacancy/',
    VACANCY: SERVER_URL + 'api/vacancy/',
    VACANCY_RESPONSES: SERVER_URL + 'api/vacancies/responses/',
    VACANCY_NEW: SERVER_URL + 'api/vacancy/new/',
};

export const SERVER_URLS = {
    SIGN_UP: SERVER_URL + 'auth/sign-up',
    SIGN_IN: SERVER_URL + 'auth/sign-in',
    AUTH: SERVER_URL + 'auth/',
    LOGOUT: SERVER_URL + 'auth/logout/',

    VACANCIES: SERVER_URL + 'api/vacancy/',
    VACANCY: SERVER_URL + 'api/vacancy/',

    RESUME: SERVER_URL + 'api/resume/',
    ADD_RESUME: SERVER_URL + 'api/resume/new',

    APPLICANT: SERVER_URL + 'api/user/',
    APPLICANT_RESUMES: SERVER_URL + 'api/applicant/resumes/',

    USER: SERVER_URL + 'api/user/',
    USER_SAFE: SERVER_URL + 'api/user/safety/',
    USER_PREVIEW: (userID: string) => {
        return SERVER_URL + 'api/user/preview/' + userID;
    },
    VACANCY_RESPONSES: SERVER_URL + 'api/vacancies/responses/',
    VACANCY_NEW: SERVER_URL + 'api/vacancy/new/',

    IMAGE: SERVER_URL + 'api/user/image/',
};

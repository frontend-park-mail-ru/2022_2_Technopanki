export const FRONT_URL = 'http://95.163.208.72:8000/';
export const SERVER_URL = 'http://95.163.208.72:8080/';
export const IMAGE_URL = FRONT_URL + 'image/';

export const USER_URLS = {
    SIGN_UP: SERVER_URL + 'auth/sign-up',
    SIGN_IN: SERVER_URL + 'auth/sign-in',
    AUTH: SERVER_URL + 'auth/',
    LOGOUT: SERVER_URL + 'auth/logout',
    CSRF: SERVER_URL + 'protected/',
};

export const PROFILE_URLS = {
    APPLICANT: SERVER_URL + 'api/user/',
    APPLICANT_RESUMES: SERVER_URL + 'api/vacancy/apply/',
    APPLICANT_APPLY: SERVER_URL + 'api/vacancy/apply',
    USER: SERVER_URL + 'api/user/',
    USER_SAFE: SERVER_URL + 'api/user/safety/',
    USER_PREVIEW: (userID: string) => {
        return SERVER_URL + 'api/user/preview/' + userID;
    },
};

export const VACANCY_URLS = {
    VACANCIES: SERVER_URL + 'api/vacancy/',
    VACANCY: SERVER_URL + 'api/vacancy/',
    VACANCY_RESPONSES: SERVER_URL + 'api/vacancy/applies/',
    VACANCY_NEW: SERVER_URL + 'api/vacancy/new/',
    PROFILE_VACANCIES: SERVER_URL + 'api/vacancy/company/',
    VACANCY_DELETE: SERVER_URL + 'api/vacancy/delete',
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

    APPLICANT: SERVER_URL + 'api/user/safety/',
    APPLICANT_RESUMES: SERVER_URL + 'api/resume/applicant/preview/',

    USER: SERVER_URL + 'api/user/',
    USER_SAFE: SERVER_URL + 'api/user/safety/',
    USER_PREVIEW: (userID: string) => {
        return SERVER_URL + 'api/user/preview/' + userID;
    },
    VACANCY_RESPONSES: SERVER_URL + 'api/vacancies/applies/',
    VACANCY_NEW: SERVER_URL + 'api/vacancy/new/',

    IMAGE: SERVER_URL + 'api/user/image/',
};

export const SERVER_URL = 'http://localhost:8080/';

export const SERVER_URLS = {
    SIGN_UP: SERVER_URL + 'auth/sign-up/',
    SIGN_IN: SERVER_URL + 'auth/sign-in/',

    VACANCIES: SERVER_URL + 'vacancies/',
    VACANCY: SERVER_URL + 'api/vacancy/',

    RESUME: SERVER_URL + 'api/resume/',
    APPLICANT: SERVER_URL + 'api/applicant/',
    APPLICANT_RESUMES: SERVER_URL + 'api/applicant/resumes/',

    USER: SERVER_URL + 'api/user/safety/',
    USER_PREVIEW: (userID: string) =>
        SERVER_URL + 'api/user/' + userID + '/preview',
    IMAGE: SERVER_URL + 'api/image',
};

import { SERVER_URL, VACANCIES_URL } from '../serverURLs.js';

export const getVacanciesFromServer = async () => {
    return fetch(SERVER_URL + VACANCIES_URL, {
        credentials: 'include',
    });
};

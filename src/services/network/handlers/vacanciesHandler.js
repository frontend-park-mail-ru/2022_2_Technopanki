import { SERVER_URL, VACANCIES_URL } from '../URLs.js';
import { NetworkHander } from '../NetworkHandler.js';

/**
 * Send GET fetch request to SERVER_URL to get all vacancies
 * @returns {Promise<{body: any, status: number}>}
 */
export const getVacanciesFromServer = async () => {
    return await NetworkHander.GET(VACANCIES_URL);
};

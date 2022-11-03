import network from '../lib/network';
import { SERVER_URLS } from '../utils/constants';
import { jsonHeader } from './jsonHeader';

export const vacancyService = (vacancyID: string) => {
    return network
        .GET(SERVER_URLS.VACANCY + vacancyID, jsonHeader)
        .then(response => {
            if (response.status > 399) {
                throw response.status;
            }

            return response.body;
        });
};

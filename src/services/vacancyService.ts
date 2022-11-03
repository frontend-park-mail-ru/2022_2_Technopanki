import network from '../lib/network';
import { SERVER_URLS } from '../utils/constants';
import { headers } from './headers';

export const vacancyService = (vacancyID: string) => {
    return network
        .GET(SERVER_URLS.VACANCY + vacancyID, headers.jsonHeader)
        .then(response => {
            if (response.status > 399) {
                throw response.status;
            }

            return response.body;
        });
};
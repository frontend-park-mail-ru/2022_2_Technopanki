import network from '../lib/network';
import { SERVER_URLS } from '../utils/constants';
import { headers } from './headers';
import { Service } from './types';

export const vacancyService: Service = {
    getVacancyData: (vacancyID: string) => {
        return network
            .GET(SERVER_URLS.VACANCY + vacancyID, headers.jsonHeader)
            .then(response => {
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            });
    },

    getVacancyHatData: (userID: string) => {
        return network
            .GET(SERVER_URLS.USER_PREVIEW(userID), headers.jsonHeader)
            .then(response => {
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            });
    },
};

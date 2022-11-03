import network from '../lib/network';
import { SERVER_URLS } from '../utils/constants';
import { headers } from './headers';
import { Service } from './types';

export const employerProfileService: Service = {
    getProfileData: async (profileID: string) => {
        return await network
            .GET(SERVER_URLS.USER + profileID, headers.jsonHeader)
            .then(response => {
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            });
    },

    // TODO: доделать когда Аким сделаем ручку
    getVacancies: async (profileID: string) => {},
};

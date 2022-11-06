import network from '../lib/network';
import { SERVER_URLS } from '../utils/constants';
import { headers } from './headers';
import { Service } from './types';

export const resumeService: Service = {
    getResumeData: (resumeID: string) => {
        return network
            .GET(SERVER_URLS.RESUME + resumeID, headers.jsonHeader)
            .then(response => {
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            });
    },

    getResumeHatData: (userID: string) => {
        return network
            .GET(SERVER_URLS.USER_PREVIEW(userID), headers.jsonHeader)
            .then(response => {
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            })
    }
}
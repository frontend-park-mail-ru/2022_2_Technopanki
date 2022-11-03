import network from '../lib/network';
import { SERVER_URLS } from '../utils/constants';
import { jsonHeader } from './jsonHeader';

export const employerProfileService = async () => {
    return await network.GET(SERVER_URLS.USER, jsonHeader).then(response => {
        if (response.status > 399) {
            throw response.status;
        }

        return response.body;
    });
};

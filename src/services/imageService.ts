import network from '../lib/network';
import { SERVER_URLS } from '../utils/constants';

export const sendProfileImg = (payload: File) => {
    return network
        .POST(SERVER_URLS.IMAGE, headers.imgHeader, payload)
        .then(response => {
            if (response.status > 399) {
                throw response.status;
            }

            return response.body;
        });
};

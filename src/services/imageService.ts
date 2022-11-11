import network from '../lib/network';
import { SERVER_URLS } from '../utils/networkConstants';
import { requestHeaders } from './headers';

export const sendProfileImg = (payload: File) => {
    return network
        .POST(SERVER_URLS.IMAGE, payload, requestHeaders.imgHeader)
        .then(response => {
            if (response.status > 399) {
                throw response.status;
            }

            return response.body;
        });
};

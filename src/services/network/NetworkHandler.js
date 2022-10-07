import { SERVER_URL } from './URLs.js';

class Handler {
    GET = async (relativePath, headers) => {
        const response = await fetch(SERVER_URL + relativePath, {
            method: 'GET',
            headers: headers,
            credentials: 'include',
        });

        return {
            status: response.status,
            body: await response.json().catch(reason => {
                console.error(reason);
                return {};
            }),
        };
    };

    POST = async (relativePath, headers, body) => {
        const response = await fetch(SERVER_URL + relativePath, {
            method: 'POST',
            headers: headers,
            body: body,
            credentials: 'include',
        });

        return {
            status: response.status,
            body: await response.json().catch(reason => {
                console.error(reason);
                return {};
            }),
        };
    };
}

export const NetworkHander = new Handler();

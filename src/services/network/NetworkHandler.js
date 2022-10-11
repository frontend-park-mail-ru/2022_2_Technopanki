import { SERVER_URL } from './URLs.js';

/**
 * Class responsible for communicating with the server
 */
class Handler {
    /**
     * Sends GET request to server.
     * @param {string} relativePath
     * @param {Object} headers
     * @returns {Promise<{body: any, status: number}>}
     */
    GET = async (relativePath, headers) => {
        if (!headers) {
            headers = {
                'Content-Type': 'application/json',
            };
        } else {
            headers['Content-Type'] = 'application/json';
        }

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

    /**
     * Sends POST request to server.
     * @param relativePath
     * @param {string} headers
     * @param {Object} body
     * @returns {Promise<{body: any, status: number}>}
     * @constructor
     */
    POST = async (relativePath, headers, body) => {
        if (!headers) {
            headers = {
                'Content-Type': 'application/json',
            };
        } else {
            headers['Content-Type'] = 'application/json';
        }

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

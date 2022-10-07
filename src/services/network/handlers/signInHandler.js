import { SERVER_URL, SIGNIN_URL } from '../URLs.js';
import { NetworkHander } from '../NetworkHandler.js';

/**
 * Send signin fetch request to SERVER_URL.
 * @param {FormData} formData
 * @returns {Promise<{body: any, status: number}>}
 */
export const sendSignInData = async formData => {
    return await NetworkHander.POST(
        SIGNIN_URL,
        null,
        JSON.stringify({
            email: formData.get('email'),
            password: formData.get('password'),
        }),
    );
};

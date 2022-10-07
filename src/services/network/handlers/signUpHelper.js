import { SERVER_URL, SIGNIN_URL, SIGNUP_URL } from '../URLs.js';
import { NetworkHander } from '../NetworkHandler.js';

/**
 * Send signup fetch request to SERVER_URL.
 * @param {FormData} formData
 * @returns {Promise<{body: any, status: number}>}
 */
export const sendSignUpData = async formData => {
    return await NetworkHander.POST(
        SIGNUP_URL,
        null,
        JSON.stringify({
            email: formData.get('email'),
            name: formData.get('name'),
            surname: formData.get('surname'),
            password: formData.get('password'),
            role: formData.get('toggle'),
        }),
    );
};

import { SERVER_URL, SIGNIN_URL } from '../serverURLs.js';

export const sendSignInData = async formData => {
    return await fetch(SERVER_URL + SIGNIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: formData.get('email'),
            password: formData.get('password'),
        }),
        credentials: 'include',
    });
};

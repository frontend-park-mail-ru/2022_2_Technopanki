import { SERVER_URL, SIGNUP_URL } from '../serverURLs.js';

export const sendSignUpData = async formData => {
    return await fetch(SERVER_URL + SIGNUP_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: formData.get('email'),
            name: formData.get('name'),
            surname: formData.get('surname'),
            password: formData.get('password'),
            role: formData.get('toggle'),
        }),
        credentials: 'include',
    });
};

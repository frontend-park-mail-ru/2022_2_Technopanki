import { SERVER_URL } from './URLs.js';
import { userModel } from '../model/userModel.js';

export const authenticateUser = async () => {
    const response = await fetch(SERVER_URL + '/auth/', {
        credentials: 'include',
    });

    return await response.json().then(data => {
        if (!data.error) {
            userModel.isAuthorized = true;
            userModel.name = data.name;
            userModel.surname = data.surname;
        }
    });
};

import { SERVER_URL } from './URLs.js';
import { userModel } from '../model/userModel.js';
import { NetworkHander } from './NetworkHandler.js';

export const authenticateUser = async () => {
    const response = await NetworkHander.GET('/auth/');

    return await response.body.then(data => {
        if (!data.error) {
            userModel.isAuthorized = true;
            userModel.name = data.name;
            userModel.surname = data.surname;
        }
    });
};

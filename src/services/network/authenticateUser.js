import { AUTH_URL, SERVER_URL } from './URLs.js';
import { userModel } from '../model/userModel.js';
import { NetworkHander } from './NetworkHandler.js';

/**
 * Helper function for user authentication.
 * This function sets user model.
 * @returns {Promise<any>}
 */
export const authenticateUser = async () => {
    const response = await NetworkHander.GET(AUTH_URL);

    if (!response.body.error) {
        userModel.isAuthorized = true;
        userModel.name = response.body.name;
        userModel.surname = response.body.surname;
    }
};

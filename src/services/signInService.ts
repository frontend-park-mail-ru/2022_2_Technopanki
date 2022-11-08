import network from '../lib/network';
import { USER_URLS } from '../utils/constants';

export const signInService = async (formData: FormData) => {
    return await network.POST(
        USER_URLS.SIGN_IN,
        JSON.stringify({
            email: formData.get('email'),
            password: formData.get('password'),
        }),
    );
};

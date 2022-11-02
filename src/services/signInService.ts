import network from '../lib/network';
import { SERVER_URL, SERVER_URLS } from '../utils/constants';
import { jsonHeader } from './jsonHeader';

export const signInService = async (formData: FormData) => {
    return await network.POST(
        SERVER_URLS.SIGN_IN,
        jsonHeader,
        JSON.stringify({
            email: formData.get('email'),
            password: formData.get('password'),
        }),
    );
};

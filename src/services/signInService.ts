import network from '../lib/network';
import { SERVER_URL, SIGN_IN_URL } from '../utils/constants';
import { jsonHeader } from './jsonHeader';

export const signInService = async (formData: FormData) => {
    return await network.POST(
        SERVER_URL + SIGN_IN_URL,
        jsonHeader,
        JSON.stringify({
            email: formData.get('email'),
            password: formData.get('password'),
        }),
    );
};

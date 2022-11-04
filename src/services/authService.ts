import { Service } from './types';
import network from '../lib/network';
import { SERVER_URLS } from '../utils/constants';

export const authService: Service = {
    signIn: async (formData: FormData) => {
        return await network.POST(
            SERVER_URLS.SIGN_IN,
            JSON.stringify({
                email: formData.get('email'),
                password: formData.get('password'),
            }),
        );
    },

    signUp: async (formData: FormData) => {
        return await network.POST(
            SERVER_URLS.SIGN_UP,
            JSON.stringify({
                email: formData.get('email'),
                password: formData.get('password'),
                applicant_name: formData.get('applicant_name'),
                applicant_surname: formData.get('applicant_surname'),
                company_name: formData.get('company_name'),
                user_type: formData.get('toggle'),
            }),
        );
    },
};

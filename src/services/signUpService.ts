import network from '../lib/network';
import { SERVER_URL, SIGN_UP_URL } from '../utils/constants';

export const SignUpService = async (formData: FormData) => {
    return await network.POST(
        SERVER_URL + SIGN_UP_URL,
        [],
        JSON.stringify({
            email: formData.get('email'),
            password: formData.get('password'),
            applicant_name: formData.get('applicant_name'),
            applicant_surname: formData.get('applicant_surname'),
            company_name: formData.get('company_name'),
            user_type: formData.get('toggle'),
        }),
    );
};

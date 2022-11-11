import { Service } from './types';
import network from '../lib/network';
import { SERVER_URLS, USER_URLS } from '../utils/networkConstants';
import { dispatch } from '../store';
import { startLoading, stopLoading } from '../store/loading/actions';

export const authService: Service = {
    signIn: async (formData: FormData) => {
        dispatch(startLoading());
        return await network
            .POST(
                USER_URLS.SIGN_IN,
                JSON.stringify({
                    email: formData.get('email'),
                    password: formData.get('password'),
                }),
            )
            .then(response => {
                dispatch(stopLoading());
                if (response.status > 399) {
                    throw response.body;
                }
                return response.body;
            });
    },

    signUp: async (formData: FormData) => {
        dispatch(startLoading());
        return await network
            .POST(
                USER_URLS.SIGN_UP,
                JSON.stringify({
                    email: formData.get('email'),
                    password: formData.get('password'),
                    applicant_name: formData.get('applicant_name'),
                    applicant_surname: formData.get('applicant_surname'),
                    company_name: formData.get('company_name'),
                    user_type: formData.get('toggle'),
                }),
            )
            .then(response => {
                dispatch(stopLoading());

                if (response.status > 399) {
                    throw response.body;
                }

                return response.body;
            });
    },

    auth: async () => {
        dispatch(startLoading());
        return network
            .GET(USER_URLS.AUTH)
            .then(response => {
                dispatch(stopLoading());

                if (response.status > 399) {
                    throw response.body;
                }

                return response.body;
            })
            .catch(err => {
                dispatch(stopLoading());
                console.error(err);
            });
    },

    logout: async () => {
        dispatch(startLoading());

        return network
            .POST(USER_URLS.LOGOUT, '')
            .then(response => {
                dispatch(stopLoading());
                if (response.status > 399) {
                    throw response.status;
                }
            })
            .catch(err => {
                dispatch(stopLoading());
                console.error(err);
            });
    },

    CSRF: async () => {
        dispatch(startLoading());
        return await network
            .GET(USER_URLS.CSRF)
            .then(response => {
                dispatch(stopLoading());
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            })
            .catch(err => {
                dispatch(stopLoading());
                console.error(err);
            });
    },
};

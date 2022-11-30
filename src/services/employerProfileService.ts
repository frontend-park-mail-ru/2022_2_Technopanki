import network from '../lib/network';
import {
    PROFILE_URLS,
    SERVER_URL,
    SERVER_URLS, VACANCY_URLS,
} from '../utils/networkConstants';
import { Service } from './types';
import { dispatch } from '../store';
import { startLoading, stopLoading } from '../store/loading/actions';
import { requestHeaders } from './headers';
import Form from '../components/UI-kit/forms/Form';

export const employerProfileService: Service = {
    getAllEmployers: async () => {
        dispatch(startLoading());
        return await network
            .GET(SERVER_URLS.ALL_EMPLOYERS, requestHeaders.jsonHeader)
            .then(response => {
                dispatch(stopLoading());
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            })
            .catch(() => dispatch(stopLoading()));
    },

    getProfileData: async (profileID: string) => {
        dispatch(startLoading());
        return await network
            .GET(PROFILE_URLS.USER_SAFE + profileID)
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

    updateProfileImg: async (profileID: string, image: FormData) => {
        dispatch(startLoading());

        const options = {
            method: 'POST',
            body: image,
            mode: 'cors' as RequestMode,
            credentials: 'include' as RequestCredentials,
        };

        return await fetch(SERVER_URLS.IMAGE, options)
            .then(response => {
                dispatch(stopLoading());
                if (response.status > 399) {
                    throw response.status;
                }

                return response.json();
            })
            .catch(() => dispatch(stopLoading()));
    },

    updateProfile: async (
        profileID: string,
        profileType: string,
        formData: FormData,
    ) => {
        dispatch(startLoading());
        return await network
            .POST(
                PROFILE_URLS.USER,
                JSON.stringify({
                    id: parseInt(profileID),
                    user_type: profileType,
                    description: formData.get('description'),
                    image: formData.get('img'),
                    status: formData.get('status'),
                    company_name: formData.get('name'),
                    contact_number: formData.get('phone'),
                    email: formData.get('email'),
                    company_size: parseInt(formData.get('size')),
                    password: formData.get('password'),
                }),
            )
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
                throw err;
            });
    },
};

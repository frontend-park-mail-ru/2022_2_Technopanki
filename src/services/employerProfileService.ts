import network from '../lib/network';
import {
    PROFILE_URLS,
    SERVER_URL,
    SERVER_URLS,
    VACANCY_URLS,
} from '../utils/networkConstants';
import { Service } from './types';
import { dispatch } from '../store';
import { startLoading, stopLoading } from '../store/loading/actions';
import { requestHeaders } from './headers';
import Form from '../components/UI-kit/forms/Form';
import { EmployerProfile } from '../store/profile/types';
import { AuthError, EmployerResponse } from './auth/types';

export const employerProfileService: {
    getProfileData: (profileID: string) => Promise<EmployerResponse>;
    updateProfileImg: (profileID: string, image: FormData) => Promise<string>;
} & Service = {
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

    getProfileData: async (profileID: string): Promise<EmployerResponse> => {
        dispatch(startLoading());
        return await network
            .GET(PROFILE_URLS.USER_SAFE + profileID)
            .then(response => {
                dispatch(stopLoading());
                if (response.status > 399) {
                    throw response.body;
                }

                return response.body;
            })
            .catch(err => {
                dispatch(stopLoading());
                throw err;
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

        return await (await fetch(SERVER_URLS.IMAGE, options))
            .json()
            .then(response => {
                dispatch(stopLoading());
                if (response.status > 399) {
                    throw response.body;
                }

                return response.image;
            });
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
                    company_size: parseInt(formData.get('size') as string),
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

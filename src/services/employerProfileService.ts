import network from '../lib/network';
import {
    PROFILE_URLS,
    SERVER_URL,
    SERVER_URLS,
} from '../utils/networkConstants';
import { Service } from './types';
import { dispatch } from '../store';
import { startLoading, stopLoading } from '../store/loading/actions';
import { requestHeaders } from './headers';
import Form from '../components/UI-kit/forms/Form';

export const employerProfileService: Service = {
    getProfileData: async (profileID: string) => {
        dispatch(startLoading());
        return await network
            .GET(PROFILE_URLS.USER_SAFE + profileID, requestHeaders.jsonHeader)
            .then(response => {
                if (response.status > 399) {
                    throw response.status;
                }

                dispatch(stopLoading());
                return response.body;
            })
            .catch(err => {
                dispatch(stopLoading());
                console.error(err);
            });
    },

    // TODO: доделать когда Аким сделаем ручку
    getVacancies: async (profileID: string) => {},

    updateProfileImg: async (profileID: string, formData: FormData) => {
        const image = document.querySelector('#avatar').files[0];

        const formDataNew = new FormData();
        formDataNew.append('avatar', image);

        const options = {
            method: 'POST',
            body: formDataNew,
            mode: 'cors' as RequestMode,
            credentials: 'include' as RequestCredentials,
        };

        console.log(options);

        return await fetch(SERVER_URLS.IMAGE, options);
    },

    // TODO: написать конвертер
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

                return response;
            })
            .catch(err => {
                dispatch(stopLoading());
                console.error(err);
                throw err;
            });
    },
};

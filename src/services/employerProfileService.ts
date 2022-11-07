import network from '../lib/network';
import { SERVER_URL, SERVER_URLS } from '../utils/constants';
import { Service } from './types';
import { dispatch } from '../store';
import { startLoading, stopLoading } from '../store/loading/actions';
import { requestHeaders } from './headers';

export const employerProfileService: Service = {
    getProfileData: async (profileID: string) => {
        dispatch(startLoading());
        return await network
            .GET(SERVER_URLS.USER_SAFE + profileID, requestHeaders.jsonHeader)
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
        const options = {
            method: 'POST',
            headers: requestHeaders.imgHeader,
            body: formData.get('avatar'),
            mode: 'cors' as RequestMode,
            credentials: 'include' as RequestCredentials,
        };

        delete options.headers['Content-Type'];

        const response = await fetch(SERVER_URLS.IMAGE, options);

        return {
            status: response.status,
            body: await response.json().catch(err => {
                console.error(err);
                return {};
            }),
        };

        // todo: нормальный урл + FormData
        // return await network
        //     .POST(SERVER_URLS.IMAGE, formData, requestHeaders.imgHeader)
        //     .then(response => {
        //         dispatch(stopLoading());
        //         if (response.status > 399) {
        //             throw response.status;
        //         }
        //
        //         return response;
        //     });
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
                SERVER_URLS.USER,
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
                    // company_city: formData.get('location'),
                    // company_city: formData.get('location'),
                    // company_size: 10000,
                    // field_of_activity: formData
                    //     .get('field_of_activity')
                    //     .toString()
                    //     .split(','),
                    // socialNetworks: {
                    //     vk: formData.get('vk'),
                    //     facebook: formData.get('facebook'),
                    //     telegram: formData.get('telegram'),
                    // },
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
            });
    },
};

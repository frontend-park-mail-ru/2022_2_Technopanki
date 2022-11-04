import network from '../lib/network';
import { SERVER_URLS } from '../utils/constants';
import { headers } from './headers';
import { Service } from './types';
import { dispatch } from '../store';
import { startLoading, stopLoading } from '../store/loading/actions';

export const employerProfileService: Service = {
    getProfileData: async (profileID: string) => {
        dispatch(startLoading());
        return await network
            .GET(SERVER_URLS.USER_SAFE + profileID, headers.jsonHeader)
            .then(response => {
                if (response.status > 399) {
                    throw response.status;
                }

                dispatch(stopLoading());
                return response.body;
            });
    },

    // TODO: доделать когда Аким сделаем ручку
    getVacancies: async (profileID: string) => {},

    // TODO: написать конвертер
    updateProfile: async (profileID: string, formData: FormData) => {
        return await network
            .POST(
                SERVER_URLS.USER,
                headers.jsonHeader,
                JSON.stringify({
                    id: profileID,
                    description: formData.get('description'),
                    image: formData.get('img'),
                    status: formData.get('status'),
                    company_name: formData.get('name'),
                    phone: formData.get('phone'),
                    email: formData.get('email'),
                    company_city: formData.get('location'),
                    company_size: 10000,
                    field_of_activity: formData
                        .get('field_of_activity')
                        .toString()
                        .split(','),
                    socialNetworks: {
                        vk: formData.get('vk'),
                        facebook: formData.get('facebook'),
                        telegram: formData.get('telegram'),
                    },
                }),
            )
            .then(response => {
                if (response.status > 399) {
                    throw response.status;
                }

                return response;
            });
    },
};

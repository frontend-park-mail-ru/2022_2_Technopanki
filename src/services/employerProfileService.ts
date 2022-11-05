import network from '../lib/network';
import { SERVER_URL, SERVER_URLS } from '../utils/constants';
import { Service } from './types';
import { dispatch } from '../store';
import { startLoading, stopLoading } from '../store/loading/actions';
import { requestHeaders } from './headers';
import headerProfile from '../components/UI-kit/header/HeaderProfile';

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
            });
    },

    // TODO: доделать когда Аким сделаем ручку
    getVacancies: async (profileID: string) => {},

    updateProfileImg: async (img: File) => {
        dispatch(startLoading());

        return await network
            .POST(SERVER_URLS.IMAGE, img, requestHeaders.imgHeader)
            .then(response => {
                dispatch(stopLoading());
                if (response.status > 399) {
                    throw response.status;
                }

                return response;
            });
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
                    id: profileID,
                    user_type: profileType,
                    description: formData.get('description'),
                    image: formData.get('img'),
                    status: formData.get('status'),
                    company_name: formData.get('name'),
                    phone: formData.get('phone'),
                    email: formData.get('email'),
                    company_city: formData.get('location'),
                    company_size: 10000,
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
            });
    },
};

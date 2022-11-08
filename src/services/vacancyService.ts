import network from '../lib/network';
import { PROFILE_URLS, VACANCY_URLS } from '../utils/constants';
import { Service } from './types';
import { dispatch } from '../store';
import { startLoading, stopLoading } from '../store/loading/actions';
import { requestHeaders } from './headers';

export const vacancyService: Service = {
    getAllVacancies: async () => {
        dispatch(startLoading());
        return await network
            .GET(VACANCY_URLS.VACANCIES, requestHeaders.jsonHeader)
            .then(response => {
                dispatch(stopLoading());
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            });
    },

    getVacancyData: async (vacancyID: string) => {
        dispatch(startLoading());
        return await network
            .GET(VACANCY_URLS.VACANCY + vacancyID, requestHeaders.jsonHeader)
            .then(response => {
                dispatch(stopLoading());
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            });
    },

    getVacancyHatData: async (userID: string) => {
        dispatch(startLoading());
        return await network
            .GET(PROFILE_URLS.USER_PREVIEW(userID), requestHeaders.jsonHeader)
            .then(response => {
                dispatch(stopLoading());
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            })
            .catch(err => console.error(err));
    },

    getResponses: async (vacancyID: string) => {
        dispatch(startLoading());
        return await network
            .GET(VACANCY_URLS.VACANCY_RESPONSES + vacancyID)
            .then(response => {
                dispatch(stopLoading());
                if (response.status > 399) {
                    throw response.status;
                }
                return response.body;
            })
            .catch(err => console.error(err));
    },

    updateVacancy: async (vacancyID: string, formData: FormData) => {
        dispatch(startLoading());
        return await network
            .PUT(
                VACANCY_URLS.VACANCY + vacancyID,
                JSON.stringify({
                    title: formData.get('title'),
                    description: formData.get('description'),
                    tasks: formData.get('tasks'),
                    requirements: formData.get('requirements'),
                    extra: formData.get('extra'),
                    salary: formData.get('salary'),
                    location: formData.get('location'),
                    experience: formData.get('experience'),
                    hours: formData.get('schedule'),
                    format: formData.get('format'),
                    // createdDate: '',
                    // skills: formData.get('skills').toString().split(','),
                }),
            )
            .then(response => {
                dispatch(stopLoading());
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            });
    },

    createVacancy: async (userID: string, formData: FormData) => {
        return await network
            .POST(
                VACANCY_URLS.VACANCY,
                JSON.stringify({
                    postedByUserId: userID,
                    title: formData.get('title'),
                    description: formData.get('description'),
                    tasks: formData.get('tasks'),
                    requirements: formData.get('requirements'),
                    extra: formData.get('extra'),
                    salary: formData.get('salary'),
                    isActive: true,
                    location: formData.get('location'),
                    experience: formData.get('experience'),
                    hours: formData.get('schedule'),
                    format: formData.get('format'),
                    // createdDate: '',
                    // skills: formData.get('skills').toString().split(','),
                }),
            )
            .then(response => {
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            });
    },
};

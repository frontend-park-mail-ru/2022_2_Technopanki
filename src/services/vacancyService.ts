import network from '../lib/network';
import { SERVER_URLS } from '../utils/constants';
import { Service } from './types';
import { dispatch } from '../store';
import { startLoading, stopLoading } from '../store/loading/actions';
import { requestHeaders } from './headers';

export const vacancyService: Service = {
    getAllVacancies: async () => {
        dispatch(startLoading());
        return await network
            .GET(SERVER_URLS.VACANCIES, requestHeaders.jsonHeader)
            .then(response => {
                if (response.status > 399) {
                    dispatch(stopLoading());
                    throw response.status;
                }

                dispatch(stopLoading());
                return response.body;
            });
    },

    getVacancyData: async (vacancyID: string) => {
        dispatch(startLoading());
        return await network
            .GET(SERVER_URLS.VACANCY + vacancyID, requestHeaders.jsonHeader)
            .then(response => {
                if (response.status > 399) {
                    dispatch(stopLoading());
                    throw response.status;
                }

                dispatch(stopLoading());
                return response.body;
            });
    },

    getVacancyHatData: async (userID: string) => {
        dispatch(startLoading());
        return await network
            .GET(SERVER_URLS.USER_PREVIEW(userID), requestHeaders.jsonHeader)
            .then(response => {
                if (response.status > 399) {
                    dispatch(stopLoading());
                    throw response.status;
                }

                dispatch(stopLoading());
                return response.body;
            });
    },

    updateVacancy: async (vacancyID: string, formData: FormData) => {
        dispatch(startLoading());
        return await network
            .PUT(
                SERVER_URLS.VACANCY + vacancyID,
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
                    skills: formData.get('skills').toString().split(','),
                }),
            )
            .then(response => {
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            });
    },

    createVacancy: async (formData: FormData) => {
        return await network
            .POST(
                SERVER_URLS.VACANCY_NEW,
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
                    skills: formData.get('skills').toString().split(','),
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

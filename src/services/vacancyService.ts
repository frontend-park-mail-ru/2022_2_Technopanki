import network from '../lib/network';
import { SERVER_URLS } from '../utils/constants';
import { Service } from './types';
import { dispatch } from '../store';
import { startLoading, stopLoading } from '../store/loading/actions';
import { requestHeaders } from './headers';

export const vacancyService: Service = {
    getAllVacancies: () => {
        dispatch(startLoading());
        return network
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

    getVacancyData: (vacancyID: string) => {
        dispatch(startLoading());
        return network
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

    getVacancyHatData: (userID: string) => {
        dispatch(startLoading());
        return network
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

    updateVacancy: (vacancyID: string, formData: FormData) => {
        dispatch(startLoading());
        return network
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

    createVacancy: (formData: FormData) => {
        return network
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

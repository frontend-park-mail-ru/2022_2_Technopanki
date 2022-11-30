import network from '../../lib/network';
import { PROFILE_URLS, VACANCY_URLS } from '../../utils/networkConstants';
import { Service } from '../types';
import { dispatch } from '../../store';
import { startLoading, stopLoading } from '../../store/loading/actions';
import { requestHeaders } from '../headers';
import { EmployerResponse } from '../auth/types';
import { VacancyResponse } from './types';

export const vacancyService: {
    getVacancyHatData: (userID: string) => Promise<EmployerResponse>;
    getVacancyData: (vacancyID: string) => Promise<VacancyResponse>;
} & Service = {
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
            })
            .catch(() => dispatch(stopLoading()));
    },

    getAllVacanciesForEmployer: async (profileID: string) => {
        dispatch(startLoading());
        return await network
            .GET(
                VACANCY_URLS.PROFILE_VACANCIES + profileID,
                requestHeaders.jsonHeader,
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
            })
            .catch(() => dispatch(stopLoading()));
    },

    getVacancyHatData: async (userID: string): Promise<EmployerResponse> => {
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
            .catch(err => {
                dispatch(stopLoading());
                console.error(err);
            });
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
                    salary: parseInt(formData.get('salary')),
                    location: formData.get('location'),
                    experience: formData.get('experience'),
                    hours: formData.get('hours'),
                    format: formData.get('format'),
                }),
            )
            .then(response => {
                dispatch(stopLoading());
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            })
            .catch(() => dispatch(stopLoading()));
    },

    createVacancy: async (
        userID: string,
        formData: FormData,
        avatarSrc: string,
    ) => {
        return await network
            .POST(
                VACANCY_URLS.VACANCY,
                JSON.stringify({
                    title: formData.get('title'),
                    description: formData.get('description'),
                    tasks: formData.get('tasks'),
                    requirements: formData.get('requirements'),
                    extra: formData.get('extra'),
                    salary: parseInt(formData.get('salary')),
                    isActive: true,
                    location: formData.get('location'),
                    experience: formData.get('experience'),
                    hours: formData.get('schedule'),
                    format: formData.get('format'),
                    image: avatarSrc,
                }),
            )
            .then(response => {
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            })
            .catch(() => dispatch(stopLoading()));
    },

    deleteVacancy: async (vacancyID: string) => {
        return await network.DELETE(VACANCY_URLS.VACANCY_DELETE + vacancyID);
    },
};

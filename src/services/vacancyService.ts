import network from '../lib/network';
import { SERVER_URL, SERVER_URLS } from '../utils/constants';
import { headers } from './headers';
import { Service } from './types';
import vacancy from '../views/Vacancy';

export const vacancyService: Service = {
    getVacancyData: (vacancyID: string) => {
        return network
            .GET(SERVER_URLS.VACANCY + vacancyID, headers.jsonHeader)
            .then(response => {
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            });
    },

    getVacancyHatData: (userID: string) => {
        return network
            .GET(SERVER_URLS.USER_PREVIEW(userID), headers.jsonHeader)
            .then(response => {
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            });
    },

    updateVacancy: (vacancyID: string, formData: FormData) => {
        return network
            .PUT(
                SERVER_URLS.VACANCY + vacancyID,
                headers.jsonHeader,
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

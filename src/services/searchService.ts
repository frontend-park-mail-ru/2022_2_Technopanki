import { Service } from './types';
import network from '../lib/network';
import { VACANCY_URLS, SERVER_URLS } from '../utils/networkConstants';
import { dispatch } from '../store';
import { stopLoading } from '../store/loading/actions';

const searchTypes = {
    vacancy: VACANCY_URLS.VACANCIES_SEARCH,
    resume: SERVER_URLS.RESUME_SEARCH,

}

export const searchService: Service = {
    searchByVacancies: async (queryParam: string) => {
        return await network
            .GET(VACANCY_URLS.VACANCIES_SEARCH + `?search=%25${queryParam}%25`)
            .then(response => {
                dispatch(stopLoading());
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            })
            .catch(err => console.error(err));
    },

    filterVacancies: async (queryString: string) => {
        return await network
            .GET(VACANCY_URLS.VACANCIES_SEARCH + `?${queryString}`)
            .then(response => {
                dispatch(stopLoading());
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            })
            .catch(err => console.error(err));
    },

    searchByResumes: async (queryParam: string) => {
        return await network
            .GET(SERVER_URLS.RESUME_SEARCH + `?search=%25${queryParam}%25`)
            .then(response => {
                dispatch(stopLoading());
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            })
            .catch(err => console.error(err));
    },

    filterResumes: async (queryString: string) => {
        return await network
            .GET(SERVER_URLS.RESUME_SEARCH + `?${queryString}`)
            .then(response => {
                dispatch(stopLoading());
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            })
            .catch(err => console.error(err));
    },

    searchByEmployers: async (queryParam: string) => {
        return await network
            .GET(SERVER_URLS.EMPLOYER_SEARCH + `?search=%25${queryParam}%25`)
            .then(response => {
                dispatch(stopLoading());
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            })
            .catch(err => console.error(err));
    },

    filterEmployers: async (queryString: string) => {
        return await network
            .GET(SERVER_URLS.EMPLOYER_SEARCH + `?${queryString}`)
            .then(response => {
                dispatch(stopLoading());
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            })
            .catch(err => console.error(err));
    },

    searchByApplicants: async (queryParam: string) => {
        return await network
            .GET(SERVER_URLS.APPLICANT_SEARCH + `?search=%25${queryParam}%25`)
            .then(response => {
                dispatch(stopLoading());
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            })
            .catch(err => console.error(err));
    },

    filterApplicants: async (queryString: string) => {
        return await network
            .GET(SERVER_URLS.APPLICANT_SEARCH + `?${queryString}`)
            .then(response => {
                dispatch(stopLoading());
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            })
            .catch(err => console.error(err));
    },
}
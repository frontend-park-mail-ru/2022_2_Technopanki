import network from '../lib/network';
import { SERVER_URL, SERVER_URLS } from '../utils/constants';
import { requestHeaders } from './headers';
import { Service } from './types';
import { dispatch } from '../store';
import { stopLoading } from '../store/loading/actions';

export const resumeService: Service = {
    getResumeData: (resumeID: string) => {
        return network
            .GET(SERVER_URLS.RESUME + resumeID, requestHeaders.jsonHeader)
            .then(response => {
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            });
    },

    getResumeHatData: (userID: string) => {
        return network
            .GET(SERVER_URLS.USER_PREVIEW(userID), requestHeaders.jsonHeader)
            .then(response => {
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            });
    },

    updateResume: async (resumeID: string, formData) => {
        return await network
            .PUT(
                SERVER_URLS.RESUME,
                JSON.stringify({
                    title: formData.get('title'),
                    description: formData.get('description'),
                    education_detail: {
                        certificate_degree_name: formData.get('status'),
                        major: formData.get('faculty'),
                        university_name: formData.get('university'),
                    },
                    experience_detail: {
                        is_current_job: formData.get('currentJob'),
                        job_title: formData.get('jobTitle'),
                        company_name: formData.get('companyName'),
                        job_location_city: formData.get('location'),
                        description: formData.get('description'),
                    },
                    applicant_skills: null,
                })
            )
            .then(response => {
                dispatch(stopLoading());
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            });
    },

    addResume: async (userID: string, formData: FormData) => {
        return await network
            .POST(
                SERVER_URLS.RESUME,
                JSON.stringify({
                    title: formData.get('title'),
                    description: formData.get('description'),
                    education_detail: {
                        certificate_degree_name: formData.get('satus'),
                        major: formData.get('faculty'),
                        university_name: formData.get('university'),
                    },
                    experience_detail: {
                        is_current_job: formData.get('currentJob'),
                        job_title: formData.get('jobTitle'),
                        company_name: formData.get('companyName'),
                        job_location_city: formData.get('location'),
                        description: formData.get('description'),
                    },
                    applicant_skills: null,
                })
            )
            .then(response => {
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            });
    }
};

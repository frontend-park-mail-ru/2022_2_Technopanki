import network from '../../lib/network';
import {
    SERVER_URLS,
} from '../../utils/networkConstants';
import { requestHeaders } from '../headers';
import { Service } from '../types';
import { dispatch } from '../../store';
import { startLoading, stopLoading } from '../../store/loading/actions';
import { ResumeResponse } from './types';
import { ApplicantResponse } from '../auth/types';

export const resumeService: {
    getResumeData: (resumeID: string) => Promise<ResumeResponse>;
    getResumeHatData: (userID: string) => Promise<ApplicantResponse>;
} & Service = {
    getAllResumes: async () => {
        dispatch(startLoading());
        return await network
            .GET(SERVER_URLS.ALL_RESUMES, requestHeaders.jsonHeader)
            .then(response => {
                dispatch(stopLoading());
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            })
            .catch(() => dispatch(stopLoading()));
    },

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
                SERVER_URLS.RESUME + resumeID,
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
                    experience: formData.get('experience'),
                    applicant_skills: null,
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
                    experience: formData.get('experience'),
                    applicant_skills: null,
                }),
            )
            .then(response => {
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            });
    },

    deleteResume: async (resumeID: string) => {
        return await network.DELETE(
            SERVER_URLS.RESUME + resumeID,
            requestHeaders.jsonHeader,
        );
    },

    downloadResume: async (resumeID: string) => {
        return await network
            .GET(SERVER_URLS.DOWNLOAD_RESUME + resumeID + '?style=default', {
                'Content-Type': 'application/pdf',
            })
            .then(response => response.body.blob())
            .then(blob => {
                const url = URL.createObjectURL(new Blob([blob]))
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                  'download',
                  `resume.pdf`,
                );
            
                // Append to html link element page
                document.body.appendChild(link);
            
                // Start download
                link.click();
            
                // Clean up and remove the link
                link.parentNode.removeChild(link);
            })
    },
};

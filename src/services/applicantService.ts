import { Service } from './types';
import network from '../lib/network';
import { requestHeaders } from './headers';
import { PROFILE_URLS, SERVER_URLS, USER_URLS } from '../utils/constants';
import { response } from 'express';
import { applicantActions } from '../store/applicant/actions';
import { startLoading, stopLoading } from '../store/loading/actions';
import { dispatch } from '../store';
import Form from '../components/UI-kit/forms/Form';

export const applicantProfileService: Service = {
    getApplicantData: async (applicantID: string) => {
        return await network
            .GET(SERVER_URLS.APPLICANT + applicantID, requestHeaders.jsonHeader)
            .then(response => {
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            });
    },

    updateProfile: async (
        applicantID: string,
        profileType: string,
        formData: FormData,
    ) => {
        dispatch(startLoading());
        const date = new Date(formData.get('dateOfBirth'));
        return await network
            .POST(
                SERVER_URLS.USER,
                JSON.stringify({
                    id: parseInt(applicantID),
                    user_type: profileType,
                    applicant_name: formData.get('name'),
                    applicant_surname: formData.get('surname'),
                    status: formData.get('status'),
                    date_of_birth: date.toISOString(),
                    location: formData.get('location'),
                    contact_number: formData.get('phone'),
                    email: formData.get('email'),
                    password: formData.get('password'),
                }),
            )
            .then(response => {
                dispatch(stopLoading());
                if (response.status > 399) {
                    throw response.status;
                }

                return response;
            })
            .catch(err => {
                dispatch(stopLoading());
                console.error(err);
            });
    },

    getResumeList: async (applicantID: string) => {
        return await network
            .GET(
                SERVER_URLS.APPLICANT_RESUMES + applicantID,
                requestHeaders.jsonHeader,
            )
            .then(response => {
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            });
    },

    getResumePreviewList: async (applicantID: string) => {
        return await network
            .GET(SERVER_URLS.APPLICANT_RESUMES + applicantID)
            .then(response => {
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            });
    },

    apply: async (
        vacancyID: string,
        resumeID: string,
        name: string,
        surname: string,
        title: string,
    ) => {
        return network
            .POST(
                PROFILE_URLS.APPLICANT_RESUMES + vacancyID,
                JSON.stringify({
                    resume_id: resumeID,
                    user_name: name,
                    user_surname: surname,
                    resume_title: title,
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

import { Service } from './types';
import network from '../lib/network';
import { requestHeaders } from './headers';
import { SERVER_URLS } from '../utils/constants';
import { response } from 'express';
import { applicantActions } from '../store/applicant/actions';
import { startLoading, stopLoading } from '../store/loading/actions';
import { dispatch } from '../store';

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
        profileID: string,
        profileType: string,
        formData: FormData,
    ) => {
        dispatch(startLoading());
        return await network
            .POST(
                SERVER_URL.USER,
                JSON.stringify({
                    id: profileID,
                    user_type: profileType,
                    name: formData.get('name'),
                    surname: form_data.get('surname'),
                    status: formData.get('status'),
                    dateOfBirth: formData.get('dateOfBirth'),
                    location: formData.get('location'),
                    phone: formData.get('phone'),
                    email: formData.get('email'),
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
            })
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
};

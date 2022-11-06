import { Service } from './types';
import network from '../lib/network';
import { requestHeaders } from './headers';
import { SERVER_URLS } from '../utils/constants';
import { response } from 'express';
import { applicantActions } from '../store/applicant/actions';

export const applicantService: Service = {
    getApplicantData: async (applicantID: string) => {
        return network.
            GET(SERVER_URLS.APPLICANT + applicantID, requestHeaders.jsonHeader)
            .then(response => {
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            })
    },

    getResumeList: async (applicantID: string) => {
        return network.
            GET(SERVER_URLS.APPLICANT_RESUMES + applicantID, requestHeaders.jsonHeader)
            .then(response => {
                if (response.status > 399) {
                    console.log('1')
                    throw response.status;
                }

                console.log(response.body)
                return response.body;
            })
    }
};
import { ProfileState } from './type';
import { Action } from '../../../Fluxs/types/action';

export const APPLICANT_ACTIONS_TYPE = {
    UPDATE: 'APPLICANT_UPDATE',
    CLEAR: 'APPLICANT_CLEAR,'
};

export const applicantActions: { [key: string]: (...data: any[]) => Action } = {
    update: (applicantProfile: ProfileState) => ({
        type: APPLICANT_ACTIONS_TYPE.UPDATE,
        applicantProfile,
    }),

    clear: () => ({
        type:APPLICANT_ACTIONS_TYPE.CLEAR
    })
}
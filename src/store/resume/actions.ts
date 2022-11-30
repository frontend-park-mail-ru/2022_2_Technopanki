import { ResumeState } from './type';
import { Action } from '../../../Fluxs/types/action';
import { ResumeResponse } from '../../services/resume/types';

export const RESUME_ACTIONS_TYPE = {
    UPDATE: 'RESUME_UPDATE',
    CLEAR: 'RESUME_CLEAR',
    UPDATE_FROM_SERVER: 'UPDATE_FROM_SERVER',
};

export const resumeActions: {
    updateFromServer: (resume: ResumeResponse) => {
        type: string;
        state: ResumeState;
    };
} & { [key: string]: (...data: any[]) => Action } = {
    update: (resume: ResumeState) => ({
        type: RESUME_ACTIONS_TYPE.UPDATE,
        resume,
    }),
    updateFromServer: (resume: ResumeResponse) => ({
        type: RESUME_ACTIONS_TYPE.UPDATE_FROM_SERVER,
        state: {
            id: resume.id.toString(),
            postedByUserID: resume.user_account_id.toString(),
            title: resume.title,
            description: resume.description,
            timeWhenCreated: resume.created_date,
        } as ResumeState,
    }),
    clear: (postedByUserID: string) => ({
        type: RESUME_ACTIONS_TYPE.CLEAR,
        postedByUserID,
    }),
};

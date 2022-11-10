import { ResumeState } from './type';
import { Action } from '../../../Fluxs/types/action';

export const RESUME_ACTIONS_TYPE = {
    UPDATE: 'RESUME_UPDATE',
    CLEAR: 'RESUME_CLEAR',
};

export const resumeActions: { [key: string]: (...data: any[]) => Action } = {
    update: (resume: ResumeState) => ({
        type: RESUME_ACTIONS_TYPE.UPDATE,
        resume,
    }),

    clear: (postedByUserID: string) => ({
        type: RESUME_ACTIONS_TYPE.CLEAR,
        postedByUserID,
    })
}
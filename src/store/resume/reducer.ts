import { Reducer } from '../../../Fluxs/types/reducer';
import { ResumeState } from './type';
import { RESUME_ACTIONS_TYPE } from './actions';
import { defaultResume } from './store';

export const resumeReducer: Reducer<ResumeState> = (state, action) => {
    switch (action.type) {
        case RESUME_ACTIONS_TYPE.UPDATE:
            console.log({ ...state, ...action.resume });
            return {...state, ...action.resume};
        case RESUME_ACTIONS_TYPE.CLEAR:
            return defaultResume;
        default:
            return state;
    }
};
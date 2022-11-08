import { Reducer } from '../../../Fluxs/types/reducer';
import { ResumeState } from './type';
import { RESUME_ACTIONS_TYPE } from './actions';
import { defaultResume } from './store';

export const resumeReducer: Reducer<ResumeState> = (state, action) => {
    switch (action.type) {
        case RESUME_ACTIONS_TYPE.UPDATE:
            return { ...state,
                ...action.resume,
                id: action.resume.id.toString(),
                postedByUserID: action.resume.postedByUserID.toString(),
            };
        case RESUME_ACTIONS_TYPE.CLEAR:
            return defaultResume;
        default:
            return state;
    }
};

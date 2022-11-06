import { Reducer } from '../../../Fluxs/types/reducer';
import { ProfileState } from './type';
import { APPLICANT_ACTIONS_TYPE } from './actions';
import { defaultApplicantProfile } from './store';

export const applicantProfileReducer: Reducer<ProfileState> = (
    state,
    action,
) => {
    switch (action.type) {
        case APPLICANT_ACTIONS_TYPE.UPDATE:
            return { ...state, ...action.applicantProfile };
        case APPLICANT_ACTIONS_TYPE.CLEAR:
            return defaultApplicantProfile;
        default:
            return state;
    }
};

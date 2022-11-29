import { Reducer } from '../../../Fluxs/types/reducer';
import { ProfileState } from './type';
import { APPLICANT_ACTIONS_TYPE } from './actions';
import { defaultApplicantProfile } from './store';
import { IMAGE_URL } from '../../utils/networkConstants';

export const applicantProfileReducer: Reducer<ProfileState> = (
    state,
    action,
) => {
    switch (action.type) {
        case APPLICANT_ACTIONS_TYPE.UPDATE:
            return {
                ...state,
                ...action.applicantProfile,
                name: action.applicantProfile.applicant_name,
                surname: action.applicantProfile.applicant_surname,
                dateOfBirth: action.applicantProfile.date_of_birth,
                phone: action.applicantProfile.contact_number,
                id: action.applicantProfile.id.toString(),
                avatarSrc: IMAGE_URL + action.applicantProfile.image,
            };
        case APPLICANT_ACTIONS_TYPE.CLEAR:
            return defaultApplicantProfile;
        default:
            return state;
    }
};

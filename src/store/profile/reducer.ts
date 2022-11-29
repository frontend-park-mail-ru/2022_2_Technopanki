import { Reducer } from '../../../Fluxs/types/reducer';
import { Action } from '../../../Fluxs/types/action';
import { ProfileState } from './types';
import { PROFILE_ACTION_TYPES } from './actions';
import { IMAGE_URL } from '../../utils/networkConstants';
import { USER_TYPE } from '../../services/auth/authService';

export const profileReducer: Reducer<ProfileState> = (
    state: ProfileState,
    action: Action,
): ProfileState => {
    switch (action.type) {
        case PROFILE_ACTION_TYPES.UPDATE_FROM_SERVER:
            return {
                ...action.state,
            };
        case PROFILE_ACTION_TYPES.UPDATE:
            return {
                ...state,
                id: action.state.id.toString(),
                profileType: action.state.user_type,
                name:
                    action.state.user_type === USER_TYPE.EMPLOYER
                        ? action.state.company_name
                        : action.state.applicant_name,
                surname:
                    action.state.user_type === USER_TYPE.APPLICANT
                        ? action.state.applicant_surname
                        : '',
                location: action.state.location,
                dateOfBirth: action.state.date_of_birth,
                status: action.state.status,
                description: action.state.description,
                phone: action.state.contact_number,
                email: action.state.email,
                avatarSrc: IMAGE_URL + action.state.image,
                size: action.state.company_size?.toString(),
            };
        case PROFILE_ACTION_TYPES.UPDATE_FROM_FORM:
            return {
                ...state,
                // avatarSrc: IMAGE_URL + action.state.image,
                avatarSrc: IMAGE_URL + action.avatarSrc,
                id: action.profileID,
                profileType: action.userType,
                name: action.formData.get('name'),
                surname: action.formData.get('surname') || '',
                status: action.formData.get('status'),
                description: action.formData.get('description'),
                phone: action.formData.get('phone'),
                email: action.formData.get('email'),
                size: action.formData.get('size')?.toString(),
            };
        case PROFILE_ACTION_TYPES.UPDATE_AVATAR:
            return {
                ...state,
                avatarSrc: action.avatarSrc,
            };
        default:
            return state;
    }
};

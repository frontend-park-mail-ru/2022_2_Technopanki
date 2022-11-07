import { Reducer } from '../../../Fluxs/types/reducer';
import { Action } from '../../../Fluxs/types/action';
import { ProfileState } from './types';
import { PROFILE_ACTION_TYPES } from './actions';

export const profileReducer: Reducer<ProfileState> = (
    state: ProfileState,
    action: Action,
): ProfileState => {
    switch (action.type) {
        case PROFILE_ACTION_TYPES.UPDATE:
            return {
                ...state,
                id: action.state.id.toString(),
                profileType: action.state.user_type,
                name:
                    action.state.user_type === 'employer'
                        ? action.state.company_name
                        : action.state.applicant_name,
                surname:
                    action.state.user_type === 'applicant'
                        ? action.state.applicant_surname
                        : '',
                status: action.state.status,
                description: action.state.description,
                phone: action.state.contact_number,
                email: action.state.email,
                // TODO: тернарник на size
                size: action.state.company_size
                    ? action.state.company_size.toString()
                    : '',
                fieldOfActivity: action.state.field_of_activity,
                // socialNetworks: {
                //     vk: '',
                //     facebook: '',
                //     telegram: '',
                // },
            };
        default:
            return state;
    }
};

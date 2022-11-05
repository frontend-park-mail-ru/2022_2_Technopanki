import { Reducer } from '../../../Fluxs/types/reducer';
import { Action } from '../../../Fluxs/types/action';
import { ProfileState } from './types';
import { PROFILE_ACTION_TYPES } from './actions';

export const profileReducer: Reducer<ProfileState> = (
    state: ProfileState,
    action: Action,
): ProfileState => {
    console.info('PROFILE REDUCER');
    console.info(action);
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
                phone: action.state.phone,
                email: action.state.email,
                // location: action.state.company_city,
                // size: action.state.company_size.toString(),
                // fieldOfActivity: action.state.field_of_activity,
                socialNetworks: {
                    vk: '',
                    facebook: '',
                    telegram: '',
                },
            };
        default:
            return state;
    }
};

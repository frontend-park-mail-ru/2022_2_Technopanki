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
            console.log(action.state);
            return {
                ...state,
                id: action.state.id.toString(),
                name: action.state.applicant_name || action.state.company_name,
                surname: action.state.applicant_surname,
                status: action.state.status,
                description: action.state.description,
                phone: action.state.contact_number,
                email: action.state.email,
                profileType: action.state.user_type,
                // fieldOfActivity: action.state.field_of_activity,
                // socialNetworks: {
                //     vk: action.state.vk,
                //     facebook: action.state.socialNetworks.facebook,
                //     telegram: action.state.socialNetworks.telegram,
                // },
            };
        default:
            return state;
    }
};

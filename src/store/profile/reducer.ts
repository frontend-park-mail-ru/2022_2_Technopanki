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
                name: action.state.company_name,
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

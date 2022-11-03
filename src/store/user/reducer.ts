import { AuthAction, UserState, UserType } from './types';
import { Reducer } from '../../../Fluxs/types/reducer';
import { Action } from '../../../Fluxs/types/action';

export const userReducer: Reducer<UserState> = (
    state: UserState,
    action: Action,
): UserState => {
    switch (action.type) {
        case 'SIGN_UP':
        case 'SIGN_IN':
            return {
                ...state,
                id: (<AuthAction>action).id,
                name: (<AuthAction>action).name,
                surname: (<AuthAction>action).surname,
                userType: (<AuthAction>action).userType,
                authorized: true,
            };
        default:
            return state;
    }
};

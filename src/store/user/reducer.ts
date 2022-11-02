import { AuthAction, UserStore } from './types';
import { Reducer } from '../../../Fluxs/types/reducer';
import { Action } from '../../../Fluxs/types/action';

export const userReducer: Reducer<UserStore> = (
    state: UserStore,
    action: Action,
): UserStore => {
    switch (action.type) {
        case 'SIGN_UP':
        case 'SIGN_IN':
            return {
                ...state,
                name: (<AuthAction>action).name,
                surname: (<AuthAction>action).surname,
                authorized: true,
            };
        default:
            return state;
    }
};

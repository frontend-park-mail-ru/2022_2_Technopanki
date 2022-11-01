import { AuthAction, UserAction, UserStore } from './types';
import { Reducer } from '../../../Fluxs/types/reducer';

export const userReducer: Reducer<UserStore, UserAction> = (
    state: UserStore,
    action: UserAction,
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
            throw new Error('undefined action type');
    }
};

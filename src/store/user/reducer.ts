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
                id: (<AuthAction>action).id.toString(),
                name: (<AuthAction>action).name,
                surname:
                    (<AuthAction>action).userType === 'applicant'
                        ? (<AuthAction>action).surname
                        : '',
                userType: (<AuthAction>action).userType,
                authorized: true,
            };
        case 'UPDATE_USER':
            return {
                ...state,
                name: action.name,
                surname: action.surname,
            };
        case 'LOGOUT':
            return {
                id: '',
                name: '',
                surname: '',
                userType: null,
                authorized: false,
            };
        default:
            return state;
    }
};

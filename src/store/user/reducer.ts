import { AuthAction, UserState, UserType } from './types';
import { Reducer } from '../../../Fluxs/types/reducer';
import { Action } from '../../../Fluxs/types/action';
import { IMAGE_URL } from '../../utils/networkConstants';

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
                surname:
                    (<AuthAction>action).userType === 'applicant'
                        ? (<AuthAction>action).surname
                        : '',
                userType: (<AuthAction>action).userType,
                avatarSrc: IMAGE_URL + (<AuthAction>action).imgSrc,
                email: (<AuthAction>action).email,
                authorized: true,
            };
        case 'UPDATE_USER_EMAIL':
            return {
                ...state,
                email: action.email,
            };
        case 'UPDATE_USER':
            return {
                ...state,
                name: action.name,
                surname: action.surname,
            };
        case 'UPDATE_USER_AVATAR':
            return {
                ...state,
                avatarSrc: IMAGE_URL + action.avatarSrc,
            };
        case 'LOGOUT':
            return {
                id: '',
                name: '',
                surname: '',
                avatarSrc: '',
                userType: null,
                authorized: false,
                email: '',
            };
        default:
            return state;
    }
};

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
                id: (<AuthAction>action).id.toString(),
                name: (<AuthAction>action).name,
                surname:
                    (<AuthAction>action).userType === 'applicant'
                        ? (<AuthAction>action).surname
                        : '',
                userType: (<AuthAction>action).userType,
                avatarSrc: IMAGE_URL + (<AuthAction>action).imgSrc,
                authorized: true,
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
                avatarSrc: 'default.png',
                userType: null,
                authorized: false,
            };
        default:
            return state;
    }
};

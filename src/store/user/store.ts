import Store from '../../../Fluxs/store';
import { userReducer } from './reducer';
import { UserState } from './types';

export const userStore = new Store<UserState>(userReducer, {
    id: '',
    name: '',
    surname: '',
    userType: null,
    email: '',
    avatarSrc: '',
    twoFactor: false,
    authorized: false,
});

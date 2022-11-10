import Store from '../../../Fluxs/store';
import { userReducer } from './reducer';
import { UserState } from './types';

export const userStore = new Store<UserState>(userReducer, {
    id: '',
    name: '',
    surname: '',
    avatarSrc: './',
    userType: null,
    authorized: false,
});

import Store from '../../../Fluxs/store';
import { userReducer } from './reducer';
import { UserState } from './types';

export const userStore = new Store<UserState>(userReducer, {
    id: null,
    name: '',
    surname: '',
    userType: null,
    authorized: false,
});

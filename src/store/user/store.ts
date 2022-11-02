import Store from '../../../Fluxs/store';
import { userReducer } from './reducer';
import { UserStore } from './types';

export const userStore = new Store<UserStore>(userReducer, {
    name: '',
    surname: '',
    authorized: false,
});

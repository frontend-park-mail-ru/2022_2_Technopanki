import Store from '../../../Fluxs/store';
import { userReducer } from './reducer';
import { UserState } from './types';

export const userStore = new Store<UserState>(userReducer, {
    id: '3',
    name: 'Test',
    surname: '',
    userType: 'employer',
    authorized: true,
});

import Store from '../../../Fluxs/store';
import { userReducer } from './reducer';
import { UserState } from './types';

export const userStore = new Store<UserState>(userReducer, {
    id: '1',
    name: 'Default',
    surname: 'Name',
    userType: 'employer',
    authorized: true,
});

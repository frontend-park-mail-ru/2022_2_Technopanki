import Store from '../../../Fluxs/store';
import { userReducer } from './reducer';
import { UserState } from './types';

export const userStore = new Store<UserState>(userReducer, {
    id: '3',
    name: 'Vladislav',
    surname: 'Kirpichov',
    userType: 'applicant',
    avatarSrc: '',
    authorized: true,
});

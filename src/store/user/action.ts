import { AuthAction } from './types';

export const userActions = {
    SIGN_UP: (name: string, surname: string): AuthAction => ({
        store: 'USER',
        type: 'SIGN_UP',
        name,
        surname,
    }),
    SIGN_IN: (name: string, surname: string): AuthAction => ({
        store: 'USER',
        type: 'SIGN_IN',
        name,
        surname,
    }),
};

import { AuthAction } from './types';

export const userActions = {
    SIGN_UP: (name: string, surname: string): AuthAction => ({
        type: 'SIGN_UP',
        name,
        surname,
    }),
    SIGN_IN: (name: string, surname: string): AuthAction => ({
        type: 'SIGN_IN',
        name,
        surname,
    }),
};

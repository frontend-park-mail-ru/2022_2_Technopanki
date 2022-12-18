import { AuthAction, UserType } from './types';

export const userActions = {
    SIGN_UP: (
        id: string,
        name: string,
        surname: string,
        email: string,
        imgSrc: string,
        userType: UserType,
    ): AuthAction => ({
        type: 'SIGN_UP',
        id,
        name,
        surname,
        email,
        imgSrc,
        userType,
        twoFactor: false,
    }),
    SIGN_IN: (
        id: string,
        name: string,
        surname: string,
        email: string,
        imgSrc: string,
        twoFactor: boolean,
        userType: UserType,
    ): AuthAction => ({
        type: 'SIGN_IN',
        id,
        name,
        email,
        surname,
        imgSrc,
        userType,
        twoFactor,
    }),
    updateName: (name: string, surname: string) => ({
        type: 'UPDATE_USER',
        name,
        surname,
    }),
    updateAvatar: (avatarSrc: string) => ({
        type: 'UPDATE_USER_AVATAR',
        avatarSrc,
    }),
    updateEmail: (email: string) => ({
        type: 'UPDATE_USER_EMAIL',
        email,
    }),
    LOGOUT: () => ({
        type: 'LOGOUT',
    }),
    updateTwoFactor: (twoFactor: boolean) => ({
        type: 'TWO_FACTOR',
        twoFactor
    })
};

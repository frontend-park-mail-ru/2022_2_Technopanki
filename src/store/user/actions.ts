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
    }),
    SIGN_IN: (
        id: string,
        name: string,
        surname: string,
        email: string,
        imgSrc: string,
        userType: UserType,
    ): AuthAction => ({
        type: 'SIGN_IN',
        id,
        name,
        email,
        surname,
        imgSrc,
        userType,
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
};

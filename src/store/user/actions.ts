import { AuthAction, UserType } from './types';

export const userActions = {
    SIGN_UP: (
        id: string,
        name: string,
        surname: string,
        imgSrc: string,
        userType: UserType,
    ): AuthAction => ({
        type: 'SIGN_UP',
        id,
        name,
        surname,
        imgSrc,
        userType,
    }),
    SIGN_IN: (
        id: string,
        name: string,
        surname: string,
        imgSrc: string,
        userType: UserType,
    ): AuthAction => ({
        type: 'SIGN_IN',
        id,
        name,
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
    LOGOUT: () => ({
        type: 'LOGOUT',
    }),
};

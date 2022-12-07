export type UserType = 'applicant' | 'employer';

export type UserState = {
    id: string;
    name: string;
    surname: string;
    email: string;
    userType: UserType | null;
    avatarSrc: string;
    twoFactor: boolean;
    authorized: boolean;
};

export interface AuthAction {
    type: string;
    id: string;
    name: string;
    email: string;
    surname: string;
    imgSrc: string;
    twoFactor: boolean;
    userType: UserType;
}

export type UserType = 'applicant' | 'employer';

export type UserState = {
    id: string | null;
    name: string;
    surname: string;
    userType: UserType | null;
    authorized: boolean;
};

export interface AuthAction {
    type: string;
    id: string | null;
    name: string;
    surname: string;
    userType: UserType;
}

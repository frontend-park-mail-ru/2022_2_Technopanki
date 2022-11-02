export type UserStore = {
    name: string;
    surname: string;
    authorized: boolean;
};

export interface AuthAction {
    type: string;
    name: string;
    surname: string;
}

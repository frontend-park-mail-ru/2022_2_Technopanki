import { Action } from '../../../Fluxs/types/action';

export type UserStore = {
    name: string;
    surname: string;
    authorized: boolean;
};

export interface UserAction extends Action<string> {
    store: 'USER';
}

export interface AuthAction extends UserAction {
    name: string;
    surname: string;
}

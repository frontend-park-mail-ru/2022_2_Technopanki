import { Action } from './action';

export type Dispatch = (action: Action) => void;

export interface Store<S = any> {
    subscribe(listener: () => void): any;
    getState(): S;
    dispatch: Dispatch;
}

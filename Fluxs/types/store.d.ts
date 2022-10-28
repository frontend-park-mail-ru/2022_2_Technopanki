import { Action } from './action';

export type Dispatch = (action: Action) => void;

export interface StoreType<S = any> {
    subscribe(listener: () => void): Function;
    getState(): S;
    dispatch: Dispatch;
}

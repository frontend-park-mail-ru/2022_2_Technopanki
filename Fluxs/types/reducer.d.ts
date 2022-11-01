import { Action } from './action';

export type Reducer<S = any, A = Action> = (state: S, action: A) => S;

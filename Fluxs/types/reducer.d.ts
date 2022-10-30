import { Action } from './action';

export type Reducer<S = any> = (state: S | undefined, action: Action) => S;

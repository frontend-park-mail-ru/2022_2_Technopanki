import { Reducer } from '../../../Fluxs/types/reducer';
import { Action } from '../../../Fluxs/types/action';

export const loadingReducer: Reducer = (state, action: Action) => {
    switch (action.type) {
        case 'loading':
            return { loading: true };
        case 'stop':
            return { loading: false };
        default:
            return state;
    }
};

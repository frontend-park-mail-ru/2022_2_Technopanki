import { Reducer } from '../../../Fluxs/types/reducer';
import { Action } from '../../../Fluxs/types/action';

export const loadingReducer: Reducer = (state, action: Action) => {
    switch (action.type) {
        case 'loading':
            return { loading: true, count: state.count + 1 };
        case 'stop':
            if (state.count === 1) {
                return { loading: false, count: 0 };
            }
            return { ...state, count: state.count - 1 };
        default:
            return state;
    }
};

import { Reducer } from '../../../Fluxs/types/reducer';
import { Action } from '../../../Fluxs/types/action';

export const errorsReducer: Reducer = (state, action: Action) => {
    switch (action.type) {
        case 'ERRORS_ACTIVATE':
            return {
                ...state,
                isActive: true,
                header: action.header,
                text: action.text,
            };
        case 'ERRORS_DEACTIVATE':
            return { ...state, isActive: false };
        default:
            return state;
    }
};

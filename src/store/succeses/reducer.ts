import { Reducer } from '../../../Fluxs/types/reducer';
import { Action } from '../../../Fluxs/types/action';

export const successReducer: Reducer = (state, action: Action) => {
    switch (action.type) {
        case 'SUCCESS_ACTIVATE':
            return {
                ...state,
                isActive: true,
                header: action.header,
                text: action.text,
            };
        case 'SUCCESS_DEACTIVATE':
            return { ...state, isActive: false };
        default:
            return state;
    }
};

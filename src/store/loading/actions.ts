import { Action } from '../../../Fluxs/types/action';

export const startLoading = (): Action => {
    return {
        type: 'loading',
    };
};

export const stopLoading = (): Action => {
    return {
        type: 'stop',
    };
};

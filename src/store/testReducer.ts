import { Action } from '../../Fluxs/types/action';

export const reducer = (state: any, action: Action): any => {
    switch (action.type) {
        case 'HELLO':
            return { ...state, value: 'hello world!' };
        case 'RANDOM':
            return {
                ...state,
                value: `${Math.random() * Date.now()}`,
            };
        default:
            if (__DEV__) {
                throw new Error('undefined type of action');
            }
    }
};

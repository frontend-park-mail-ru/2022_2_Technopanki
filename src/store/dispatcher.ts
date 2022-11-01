import { Action } from '../../Fluxs/types/action';
import { userStore } from './user/store';

export const storeDispatcher = (action: Action) => {
    switch (action.store) {
        case 'USER':
            userStore.dispatch(action);
        default:
            throw new Error('undefined store type');
    }
};

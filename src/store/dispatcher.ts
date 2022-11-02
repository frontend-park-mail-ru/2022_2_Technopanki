import { Action } from '../../Fluxs/types/action';
import { userStore } from './user/store';

export const storeDispatcher = (action: Action) => {
    console.info(`storeDispatcher action: `);
    console.info(action);
    switch (action.store) {
        case 'USER':
            return userStore.dispatch(action);
        default:
            throw new Error(`undefined store type: ${action.store}`);
    }
};

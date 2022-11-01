import dispatcher from '../../Fluxs/dispatcher';
import { Action } from '../../Fluxs/types/action';
import { store } from './testStore';

export const randomDispatcher = (action: Action) => {
    switch (action.store) {
        case 'RANDOM':
            store.dispatch(action);
    }
};

import Store from '../../../Fluxs/store';
import { errorsReducer } from './reducer';

const initState = {
    isActive: false,
    header: 'Hello',
    text: 'World',
};

export const errorsStore = new Store(errorsReducer, initState);

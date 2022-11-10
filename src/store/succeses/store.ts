import Store from '../../../Fluxs/store';
import { successReducer } from './reducer';

const initState = {
    isActive: false,
    header: 'Hello',
    text: 'World',
};

export const successStore = new Store(successReducer, initState);

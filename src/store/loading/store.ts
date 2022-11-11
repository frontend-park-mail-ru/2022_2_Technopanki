import Store from '../../../Fluxs/store';
import { loadingReducer } from './reducer';

const initState = {
    isLoading: false,
    count: 0,
};

export const loadingStore = new Store(loadingReducer, initState);

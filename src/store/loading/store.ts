import Store from '../../../Fluxs/store';
import { loadingReducer } from './reducer';

const initState = {
    isLoading: false,
};

export const loadingStore = new Store(loadingReducer, initState);

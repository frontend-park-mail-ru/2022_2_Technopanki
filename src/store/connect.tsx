import createConnect from '../../Reacts/reacts-flux/connect';
import { store } from './testStore';

export const connect = createConnect(store);

import { store } from './testStore';
import createConnect from '../../Reacts/reacts-fluxs/connect';

const dispatch = store.dispatch.bind(store);
const connect = createConnect(store);

export { connect, dispatch };

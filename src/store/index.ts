import { store } from './testStore';
import createConnect from '../../Reacts/reacts-flux/connect';

const dispatch = store.dispatch.bind(store);
const connect = createConnect(store);

export { connect, dispatch };

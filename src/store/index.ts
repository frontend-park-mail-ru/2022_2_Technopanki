import { store } from './testStore';
import createConnect from '../../Reacts/reacts-fluxs/connect';
import dispatcher from '../../Fluxs/dispatcher';
import { randomDispatcher } from './testDispatcher';

dispatcher.register(randomDispatcher);

const dispatch = dispatcher.dispatch.bind(dispatcher);
const connect = createConnect(store);

export { connect, dispatch };

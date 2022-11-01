import createConnect from '../../Reacts/reacts-fluxs/connect';
import dispatcher from '../../Fluxs/dispatcher';
import { storeDispatcher } from './dispatcher';
import { userStore } from './user/store';

dispatcher.register(storeDispatcher);

const dispatch = dispatcher.dispatch.bind(dispatcher);
const userConnect = createConnect(userStore);

export { userConnect, dispatch };

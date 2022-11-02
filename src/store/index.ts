import createConnect from '../../Reacts/reacts-fluxs/connect';
import dispatcher from '../../Fluxs/dispatcher';
import { userStore } from './user/store';
import { vacancyStore } from './vacancy/store';

dispatcher.register(userStore.dispatch.bind(userStore));
dispatcher.register(vacancyStore.dispatch.bind(vacancyStore));

export const dispatch = dispatcher.dispatch.bind(dispatcher);
export const userConnect = createConnect(userStore);

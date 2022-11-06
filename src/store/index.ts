import createConnect from '../../Reacts/reacts-fluxs/connect';
import dispatcher from '../../Fluxs/dispatcher';
import { userStore } from './user/store';
import { vacancyStore } from './vacancy/store';
import { profileStore } from './profile/store';
import { loadingStore } from './loading/store';
import { errorsStore } from './errors/store';

dispatcher.register(userStore.dispatch.bind(userStore));
dispatcher.register(vacancyStore.dispatch.bind(vacancyStore));
dispatcher.register(profileStore.dispatch.bind(profileStore));
dispatcher.register(loadingStore.dispatch.bind(loadingStore));
dispatcher.register(errorsStore.dispatch.bind(errorsStore));

export const dispatch = dispatcher.dispatch.bind(dispatcher);

export const userConnect = createConnect(userStore);
export const vacancyConnect = createConnect(vacancyStore);
export const profileConnect = createConnect(profileStore);
export const loadingConnect = createConnect(loadingStore);
export const errorsConnect = createConnect(errorsStore);

import createConnect from '../../Reacts/reacts-fluxs/connect';
import dispatcher from '../../Fluxs/dispatcher';
import { userStore } from './user/store';
import { vacancyStore } from './vacancy/store';
import { resumeStore } from './resume/store';
import { applicantProfileStore } from './applicant/store';

dispatcher.register(userStore.dispatch.bind(userStore));
dispatcher.register(vacancyStore.dispatch.bind(vacancyStore));
dispatcher.register(resumeStore.dispatch.bind(resumeStore));
dispatcher.register(applicantProfileStore.dispatch.bind(applicantProfileStore))

export const dispatch = dispatcher.dispatch.bind(dispatcher);
export const userConnect = createConnect(userStore);
export const vacancyConnect = createConnect(vacancyStore);
export const resumeConnect = createConnect(resumeStore);
export const applicantConnect = createConnect(applicantProfileStore)
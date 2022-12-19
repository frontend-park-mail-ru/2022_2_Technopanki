import createConnect from '../../Reacts/reacts-flux/connect';
import dispatcher from '../../Fluxs/dispatcher';
import { userStore } from './user/store';
import { vacancyStore } from './vacancy/store';
import { profileStore } from './profile/store';
import { loadingStore } from './loading/store';
import { errorsStore } from './errors/store';
import { resumeStore } from './resume/store';
import { applicantProfileStore } from './applicant/store';
import { successStore } from './succeses/store';
<<<<<<< HEAD
import { notificationStore } from './notification/store';
=======
import { vacancyFilterStore } from './filters/store';
>>>>>>> main

dispatcher.register(userStore.dispatch.bind(userStore));
dispatcher.register(vacancyStore.dispatch.bind(vacancyStore));
dispatcher.register(resumeStore.dispatch.bind(resumeStore));
dispatcher.register(applicantProfileStore.dispatch.bind(applicantProfileStore));
dispatcher.register(profileStore.dispatch.bind(profileStore));
dispatcher.register(loadingStore.dispatch.bind(loadingStore));
dispatcher.register(errorsStore.dispatch.bind(errorsStore));
dispatcher.register(errorsStore.dispatch.bind(successStore));
dispatcher.register(notificationStore.dispatch.bind(notificationStore))

export const dispatch = dispatcher.dispatch.bind(dispatcher);

export const userConnect = createConnect(userStore);
export const vacancyConnect = createConnect(vacancyStore);
export const profileConnect = createConnect(profileStore);
export const loadingConnect = createConnect(loadingStore);
export const errorsConnect = createConnect(errorsStore);
export const successConnect = createConnect(successStore);
export const notificationConnect = createConnect(notificationStore)
export const resumeConnect = createConnect(resumeStore);
export const applicantConnect = createConnect(applicantProfileStore);

import Store from "../../../Fluxs/store";
import { notificationReducer } from "./reducer";
import { Notification } from "./type";

const defaultNotification: Notification = {
    type: '',
    resumeTitle: '',
    resumeID: '',
    notificationAuthor: '',
    notificationAuthorID: '',
    vacancyID: '',
    vacancyTitle: '',
    applicantID: '',
    applicantName: '',
};

export const notificationStore = new Store(notificationReducer, defaultNotification)

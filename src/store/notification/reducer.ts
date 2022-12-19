import { Action } from "../../../Fluxs/types/action";
import { Reducer } from "../../../Fluxs/types/reducer";
import { NOTIFICATION_ACTIONS } from "./action";
import { Notification, VacancyNotification } from "./type";

export const notificationReducer: Reducer<Notification> = (
    state: Notification,
    action: Action,
): Notification => {
    switch (action.type) {
        case NOTIFICATION_ACTIONS.NOTIFY_VACANCY_APPLY:
            return {
                ...action.state
            } as Notification
        case NOTIFICATION_ACTIONS.NOTIFY_RESUME_DOWNLOAD:
            return {
                ...action.state
            } as Notification
        default:
            return state
    }
};

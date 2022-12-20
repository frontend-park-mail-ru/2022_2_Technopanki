import network from "../lib/network";
import { SERVER_URLS, VACANCY_URLS } from '../utils/networkConstants';
import { dispatch } from '../store';
import { startLoading, stopLoading } from '../store/loading/actions';
import { requestHeaders } from './headers';
import { ResumeResponse } from './resume/types';
import { Service } from './types';

export const notificationService: {
    subscribe: (callback: (message: string) => void) => void,
} & Service = {
    subscribe: (callback: (message: string) => void): void => {
        network.WEBSOCKET(SERVER_URLS.NOTIFICATION, callback)
    },

    getAllNotifications: async () => {
        dispatch(startLoading());
        return await network
            .GET(SERVER_URLS.ALL_NOTIFICATIONS, requestHeaders.jsonHeader)
            .then(response => {
                dispatch(stopLoading());
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            })
            .catch(() => dispatch(stopLoading()));
    },

    setNotificationsWatched: async (notificationID: string) => {
        dispatch(startLoading());
        return await network
            .PUT(
                SERVER_URLS.NOTIFICATIONS_READ + notificationID
            )
            .then(response => {
                dispatch(stopLoading());
                if (response.status > 399) {
                    throw response.status;
                }

                return response.body;
            })
            .catch(() => dispatch(stopLoading()));
    }
}

import { ResumeNotification, VacancyNotification } from "./type"

export const NOTIFICATION_TYPES = {
    APPLY: 'apply',
    RESUME_DOWNLOAD: 'download resume'
}

export const NOTIFICATION_ACTIONS = {
    NOTIFY: 'NOTIFICATIONS_NOTIFY',
    NOTIFY_RESUME_DOWNLOAD: 'NOTIFICATIONS_NOTIFY_RESUME_DOWNLOAD',
    NOTIFY_VACANCY_APPLY: 'NOTIFICATIONS_NOTIFY_VACANCY_APPLY'
}

export const notificationActions: {
    notifyResumeDownload: (
        notificationAuthor: string,
        notificationAuthorID: string,
        resumeTitle: string,
        resumeID: string,
    ) => {
        type: string;
        state: ResumeNotification
    };
    notifyApply: (
        vacancyTitle: string,
        vacancyID: string,
    ) => { type: string; state: VacancyNotification };
} = {
    notifyResumeDownload: (
        notificationAuthor: string,
        notificationAuthorID: string,
        resumeTitle: string,
        resumeID: string,
    ) => {
        return {
            type: NOTIFICATION_ACTIONS.NOTIFY_RESUME_DOWNLOAD,
            state: {
                type: NOTIFICATION_TYPES.RESUME_DOWNLOAD,
                notificationAuthor: notificationAuthor,
                notificationAuthorID: notificationAuthorID,
                resumeTitle: resumeTitle,
                resumeID: resumeID,
            },
        };
    },
    notifyApply: (
        vacancyTitle: string,
        vacancyID: string,
    ) => ({
        type: NOTIFICATION_ACTIONS.NOTIFY_VACANCY_APPLY,
        state: {
            type: NOTIFICATION_TYPES.APPLY,
            vacancyTitle: vacancyTitle,
            vacancyID: vacancyID,
        },
    }),
};

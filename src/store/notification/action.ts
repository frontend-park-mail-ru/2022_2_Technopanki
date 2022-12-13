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
    notifyApply: (
        notificationAuthor: string,
        notificationAuthorID: string,
        resumeTitle: string,
        resumeID: string,
    ) => { type: string; state: ResumeNotification };
    notifyResumeDownload: (vacancyTitle: string,
        vacancyID: string,
        applicantName: string,
        applicantID: string,
    ) => {
        type: string;
        state: VacancyNotification;
    };
} = {
    notifyApply: (
        notificationAuthor: string,
        notificationAuthorID: string,
        resumeTitle: string,
        resumeID: string,
    ) => {
        return {
            type: NOTIFICATION_ACTIONS.NOTIFY_VACANCY_APPLY,
            state: {
                type: NOTIFICATION_TYPES.APPLY,
                notificationAuthor: notificationAuthor,
                notificationAuthorID: notificationAuthorID,
                resumeTitle: resumeTitle,
                resumeID: resumeID,
            },
        };
    },
    notifyResumeDownload: (
        vacancyTitle: string,
        vacancyID: string,
        applicantName: string,
        applicantID: string,
    ) => ({
        type: NOTIFICATION_ACTIONS.NOTIFY_RESUME_DOWNLOAD,
        state: {
            type: NOTIFICATION_TYPES.RESUME_DOWNLOAD,
            vacancyTitle: vacancyTitle,
            vacancyID: vacancyID,
            applicantName: applicantName,
            applicantID: applicantID,
        },
    }),
};

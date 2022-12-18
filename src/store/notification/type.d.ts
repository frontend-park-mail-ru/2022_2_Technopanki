export type ResumeNotification = {
    type: string;
    notificationAuthor: string;
    notificationAuthorID: string;
    resumeTitle: string;
    resumeID: string;
}

export type VacancyNotification = {
    type: string;
    vacancyTitle: string;
    vacancyID: string;
    applicantName: string;
    applicantID: string;
    isWatched: boolean;
}

export type Notification = ResumeNotification & VacancyNotification

export type VacancyUpdateError = {
    error: string;
};

export type VacancyResponse = {
    id: number;
    postedByUserId: number;
    title: string;
    description: string;
    tasks: string;
    requirements: string;
    extra: string;
    createdDate: string;
    salary: number;
    location: string;
    isActive: boolean;
    experience: string;
    format: string;
    image: string;
    vacancyActivities: null | [];
    skills: null | [];
    hours: string
};

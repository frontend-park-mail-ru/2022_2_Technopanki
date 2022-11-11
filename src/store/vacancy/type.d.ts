export type VacancyState = {
    id: string;
    postedByUserID: string;
    jobType: string;
    title: string;
    description: string;
    tasks: string;
    requirements: string;
    extra: string;
    // Sidebar
    createdDate: string;
    salary: string;
    location: string;
    isActive: boolean;
    experience: string;
    format: string;
    hours: string;
    skills: string[];
};

export type ResumeState = {
    id: string;
    postedByUserID: string;
    avatarSrc: string;
    title: string;
    description: string;
    university: string;
    faculty: string;
    status: string;
    timeWhenCreated: string;
    // Sidebar
    location: string;
    dateOfBirth: string;
    isActive: boolean;
    skills: string[];
    vk: string | null | undefined;
    facebook: string | null | undefined;
    telegram: string | null | undefined;
}
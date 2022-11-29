export type ProfileState = {
    id: string;
    avatarSrc: string;
    name: string;
    surname: string;
    status: string;
    phone: string;
    email: string;
    location: string;
    dateOfBirth: string;
    skills: string[];
    vk: string | null | undefined;
    facebook: string | null | undefined;
    telegram: string | null | undefined;
};

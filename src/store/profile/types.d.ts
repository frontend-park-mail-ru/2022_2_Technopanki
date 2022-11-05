export type EmployerSocialNetworks = {
    vk?: string;
    facebook?: string;
    telegram?: string;
    youtube?: string;
    twitter?: string;
    instagram?: string;
};

export type EmployerProfile = {
    id: string;
    bannerSrc: string;
    avatarSrc: string;
    name: string;
    status: string;
    description: string;
    phone: string;
    email: string;
    location: string;
    size: string;
    fieldOfActivity: string[];
    socialNetworks: EmployerSocialNetworks;
};

export type ProfileState = EmployerProfile & {
    profileType: string;
    surname: string;
};
